import { Model, DataTypes, Optional } from 'sequelize';
import sequelize from '../database/connection';

interface OrderAttributes {
  id: string;
  cliente_id: string;
  vendedor_id: string;
  entregador_id: string | null;
  valor_total: number;
  forma_pagamento: 'pix' | 'cartao' | 'dinheiro';
  valor_pago_cliente: number | null;
  troco: number | null;
  status: 'recebido' | 'separacao' | 'embalando' | 'nf_emitida' | 'em_rota' | 'entregue';
  processado_funcionario: boolean;
  payment_status: 'pending' | 'paid' | 'failed' | 'refunded';
  created_at: Date;
  updated_at: Date;
}

class Order extends Model<OrderAttributes> {
  public id!: string;
  public cliente_id!: string;
  public vendedor_id!: string;
  public entregador_id!: string | null;
  public valor_total!: number;
  public forma_pagamento!: 'pix' | 'cartao' | 'dinheiro';
  public valor_pago_cliente!: number | null;
  public troco!: number | null;
  public status!: 'recebido' | 'separacao' | 'embalando' | 'nf_emitida' | 'em_rota' | 'entregue';
  public processado_funcionario!: boolean;
  public payment_status!: 'pending' | 'paid' | 'failed' | 'refunded';

  static associate(models: any) {
    Order.belongsTo(models.User, { foreignKey: 'cliente_id', as: 'cliente' });
    Order.belongsTo(models.User, { foreignKey: 'vendedor_id', as: 'vendedor' });
    Order.belongsTo(models.Entregador, { foreignKey: 'entregador_id', as: 'entregador' });
    Order.hasMany(models.OrderItem, { foreignKey: 'order_id', as: 'itens' });
    Order.hasMany(models.Inadimplencia, { foreignKey: 'order_id', as: 'inadimplencias' });
  }
}

Order.init(
  {
    id: {
      type: DataTypes.UUID,
      defaultValue: DataTypes.UUIDV4,
      primaryKey: true,
    },
    cliente_id: {
      type: DataTypes.UUID,
      allowNull: false,
      references: { model: 'users', key: 'id' },
    },
    vendedor_id: {
      type: DataTypes.UUID,
      allowNull: false,
      references: { model: 'users', key: 'id' },
    },
    entregador_id: {
      type: DataTypes.UUID,
      allowNull: true,
      references: { model: 'entregadores', key: 'id' },
    },
    valor_total: {
      type: DataTypes.DECIMAL(10, 2),
      allowNull: false,
    },
    forma_pagamento: {
      type: DataTypes.ENUM('pix', 'cartao', 'dinheiro'),
      allowNull: false,
    },
    valor_pago_cliente: {
      type: DataTypes.DECIMAL(10, 2),
      allowNull: true,
    },
    troco: {
      type: DataTypes.DECIMAL(10, 2),
      allowNull: true,
    },
    status: {
      type: DataTypes.ENUM('recebido', 'separacao', 'embalando', 'nf_emitida', 'em_rota', 'entregue'),
      defaultValue: 'recebido',
    },
    processado_funcionario: {
      type: DataTypes.BOOLEAN,
      defaultValue: false,
    },
    payment_status: {
      type: DataTypes.ENUM('pending', 'paid', 'failed', 'refunded'),
      defaultValue: 'pending',
    },
    created_at: {
      type: DataTypes.DATE,
      defaultValue: DataTypes.NOW,
    },
    updated_at: {
      type: DataTypes.DATE,
      defaultValue: DataTypes.NOW,
    },
  },
  {
    sequelize,
    modelName: 'Order',
    tableName: 'orders',
    timestamps: true,
    underscored: true,
  }
);

export default Order;
