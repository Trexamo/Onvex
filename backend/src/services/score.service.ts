import { User } from '../models/User';
import { Order } from '../models/Order';
import { Inadimplencia } from '../models/Inadimplencia';
import { logger } from '../utils/logger';

const REGRAS_INADIMPLENCIA = {
  limitePedidosPendentes: 3,
  valorMinimoPrimeiraCompra: 50,
  taxaAntecipadaRisco: 0.10, // 10%
  bloquearAposRecusas: 2,
  confirmacaoWhatsApp: true,
  depositoCaucao: 20, // 20%
};

export class ScoreService {
  // Calcular score baseado em entregas pagas
  async calcularScore(clienteId: string): Promise<number> {
    try {
      const entregasPagas = await Order.count({
        where: {
          cliente_id: clienteId,
          status: 'entregue',
          payment_status: 'paid'
        }
      });

      const recusas = await Inadimplencia.count({
        where: { cliente_id: clienteId }
      });

      if (recusas >= 2) return -1; // Bloqueado
      if (recusas >= 1) return 0; // Risco
      if (entregasPagas >= 5) return 100; // Bom
      if (entregasPagas >= 2) return 50; // Médio
      
      return 50; // Novo cliente
    } catch (error) {
      logger.error('Erro ao calcular score:', error);
      return 50;
    }
  }

  // Verificar se cliente pode fazer pedido
  async podeFazerPedido(clienteId: string, valorPedido: number): Promise<{ pode: boolean; motivo?: string }> {
    try {
      const cliente = await User.findByPk(clienteId);
      if (!cliente) return { pode: false, motivo: 'Cliente não encontrado' };

      if (cliente.status === 'bloqueado') {
        return { pode: false, motivo: 'Cliente bloqueado por inadimplência' };
      }

      // Verificar pedidos pendentes
      const pedidosPendentes = await Order.count({
        where: {
          cliente_id: clienteId,
          status: ['pending', 'separacao', 'embalando', 'em_rota']
        }
      });

      if (pedidosPendentes >= REGRAS_INADIMPLENCIA.limitePedidosPendentes) {
        return { 
          pode: false, 
          motivo: `Limite de ${REGRAS_INADIMPLENCIA.limitePedidosPendentes} pedidos pendentes atingido` 
        };
      }

      // Primeira compra? Verificar valor mínimo
      const comprasAnteriores = await Order.count({
        where: { cliente_id: clienteId }
      });

      if (comprasAnteriores === 0 && valorPedido < REGRAS_INADIMPLENCIA.valorMinimoPrimeiraCompra) {
        return { 
          pode: false, 
          motivo: `Primeira compra deve ser no mínimo R$ ${REGRAS_INADIMPLENCIA.valorMinimoPrimeiraCompra}` 
        };
      }

      return { pode: true };
    } catch (error) {
      logger.error('Erro ao verificar pedido:', error);
      return { pode: false, motivo: 'Erro interno' };
    }
  }

  // Registrar inadimplência
  async registrarInadimplencia(clienteId: string, orderId: string, motivo: string) {
    try {
      await Inadimplencia.create({
        cliente_id: clienteId,
        order_id: orderId,
        motivo
      });

      const recusas = await Inadimplencia.count({ where: { cliente_id: clienteId } });
      
      if (recusas >= REGRAS_INADIMPLENCIA.bloquearAposRecusas) {
        await User.update(
          { status: 'bloqueado', score_inadimplencia: -1 },
          { where: { id: clienteId } }
        );
      } else {
        await User.update(
          { score_inadimplencia: recusas === 1 ? 0 : 50 },
          { where: { id: clienteId } }
        );
      }

      logger.info(`Inadimplência registrada para cliente ${clienteId}`);
    } catch (error) {
      logger.error('Erro ao registrar inadimplência:', error);
    }
  }
}
