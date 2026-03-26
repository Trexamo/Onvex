-- Adicionar colunas na tabela users
ALTER TABLE users ADD COLUMN IF NOT EXISTS score_inadimplencia INT DEFAULT 100;
ALTER TABLE users ADD COLUMN IF NOT EXISTS status VARCHAR(20) DEFAULT 'ativo';

-- Criar tabela de inadimplências
CREATE TABLE IF NOT EXISTS inadimplencias (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    cliente_id UUID NOT NULL REFERENCES users(id),
    order_id UUID NOT NULL REFERENCES orders(id),
    motivo VARCHAR(255) NOT NULL,
    data_ocorrencia TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Criar tabela de entregadores
CREATE TABLE IF NOT EXISTS entregadores (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    user_id UUID NOT NULL UNIQUE REFERENCES users(id),
    veiculo VARCHAR(100) NOT NULL,
    placa VARCHAR(10) NOT NULL,
    area_atuacao VARCHAR(100) NOT NULL,
    status VARCHAR(20) DEFAULT 'disponivel',
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Adicionar colunas na tabela orders
ALTER TABLE orders ADD COLUMN IF NOT EXISTS vendedor_id UUID REFERENCES users(id);
ALTER TABLE orders ADD COLUMN IF NOT EXISTS entregador_id UUID REFERENCES entregadores(id);
ALTER TABLE orders ADD COLUMN IF NOT EXISTS forma_pagamento VARCHAR(20);
ALTER TABLE orders ADD COLUMN IF NOT EXISTS valor_pago_cliente DECIMAL(10,2);
ALTER TABLE orders ADD COLUMN IF NOT EXISTS troco DECIMAL(10,2);
ALTER TABLE orders ADD COLUMN IF NOT EXISTS processado_funcionario BOOLEAN DEFAULT FALSE;

-- Adicionar coluna is_bump na tabela products
ALTER TABLE products ADD COLUMN IF NOT EXISTS is_bump BOOLEAN DEFAULT FALSE;
ALTER TABLE products ADD COLUMN IF NOT EXISTS produto_bump_id UUID REFERENCES products(id);

-- Criar tabela de carteira
CREATE TABLE IF NOT EXISTS wallets (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    user_id UUID NOT NULL UNIQUE REFERENCES users(id),
    saldo_disponivel DECIMAL(10,2) DEFAULT 0,
    saldo_bloqueado DECIMAL(10,2) DEFAULT 0,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);
