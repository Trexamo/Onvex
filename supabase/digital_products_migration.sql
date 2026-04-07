-- ============================================
-- PRODUTOS DIGITAIS - MIGRAÇÃO
-- ============================================

-- 1. Tabela para métodos de entrega de produtos digitais
CREATE TABLE IF NOT EXISTS digital_delivery_methods (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    product_id UUID REFERENCES products(id) ON DELETE CASCADE,
    method_type TEXT CHECK (method_type IN ('email', 'link', 'membership')),
    value TEXT NOT NULL,
    created_at TIMESTAMP DEFAULT NOW(),
    updated_at TIMESTAMP DEFAULT NOW()
);

-- 2. Tabela para registrar entregas digitais
CREATE TABLE IF NOT EXISTS digital_deliveries (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    order_id UUID REFERENCES orders(id) ON DELETE CASCADE,
    product_id UUID REFERENCES products(id),
    customer_email TEXT NOT NULL,
    customer_phone TEXT,
    delivery_method TEXT CHECK (delivery_method IN ('email', 'link', 'membership')),
    delivery_data JSONB,
    status TEXT DEFAULT 'pending' CHECK (status IN ('pending', 'sent', 'failed')),
    sent_at TIMESTAMP,
    created_at TIMESTAMP DEFAULT NOW()
);

-- 3. Tabela para webhooks de pagamento
CREATE TABLE IF NOT EXISTS payment_webhooks (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    order_id UUID REFERENCES orders(id),
    gateway TEXT NOT NULL,
    payload JSONB NOT NULL,
    processed BOOLEAN DEFAULT false,
    created_at TIMESTAMP DEFAULT NOW()
);

-- 4. Função para processar entrega digital
CREATE OR REPLACE FUNCTION process_digital_delivery(
    p_order_id UUID,
    p_product_id UUID,
    p_customer_email TEXT,
    p_customer_phone TEXT
)
RETURNS JSONB AS $$
DECLARE
    v_delivery_method RECORD;
    v_delivery_data JSONB;
BEGIN
    SELECT * INTO v_delivery_method
    FROM digital_delivery_methods
    WHERE product_id = p_product_id;
    
    IF NOT FOUND THEN
        RETURN jsonb_build_object('success', false, 'message', 'Método de entrega não configurado');
    END IF;
    
    IF v_delivery_method.method_type = 'email' THEN
        v_delivery_data := jsonb_build_object(
            'sent_to', v_delivery_method.value,
            'message', 'Produto digital enviado para o cliente'
        );
    ELSIF v_delivery_method.method_type = 'link' THEN
        v_delivery_data := jsonb_build_object(
            'download_link', v_delivery_method.value,
            'expires_in', '24 hours'
        );
    ELSE
        v_delivery_data := jsonb_build_object(
            'membership_url', v_delivery_method.value,
            'instructions', 'Acesse a área de membros'
        );
    END IF;
    
    INSERT INTO digital_deliveries (
        order_id, product_id, customer_email, customer_phone,
        delivery_method, delivery_data, status, sent_at
    ) VALUES (
        p_order_id, p_product_id, p_customer_email, p_customer_phone,
        v_delivery_method.method_type, v_delivery_data, 'sent', NOW()
    );
    
    RETURN jsonb_build_object('success', true, 'message', 'Produto digital entregue', 'data', v_delivery_data);
END;
$$ LANGUAGE plpgsql;

-- 5. Trigger para processar pedidos digitais automaticamente
CREATE OR REPLACE FUNCTION handle_digital_order()
RETURNS TRIGGER AS $$
DECLARE
    order_item RECORD;
BEGIN
    IF NEW.payment_status = 'paid' AND OLD.payment_status = 'pending' THEN
        FOR order_item IN 
            SELECT oi.product_id, p.type 
            FROM order_items oi
            JOIN products p ON oi.product_id = p.id
            WHERE oi.order_id = NEW.id AND p.type = 'digital'
        LOOP
            PERFORM process_digital_delivery(
                NEW.id,
                order_item.product_id,
                (SELECT email FROM users WHERE id = NEW.cliente_id),
                NULL
            );
        END LOOP;
    END IF;
    
    RETURN NEW;
END;
$$ LANGUAGE plpgsql;

-- 6. Aplicar trigger
DROP TRIGGER IF EXISTS trigger_digital_order ON orders;
CREATE TRIGGER trigger_digital_order
AFTER UPDATE ON orders
FOR EACH ROW
EXECUTE FUNCTION handle_digital_order();

-- 7. Índices
CREATE INDEX IF NOT EXISTS idx_digital_delivery_methods_product_id ON digital_delivery_methods(product_id);
CREATE INDEX IF NOT EXISTS idx_digital_deliveries_order_id ON digital_deliveries(order_id);
CREATE INDEX IF NOT EXISTS idx_digital_deliveries_status ON digital_deliveries(status);
CREATE INDEX IF NOT EXISTS idx_payment_webhooks_processed ON payment_webhooks(processed);
