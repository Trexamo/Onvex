import { Model, DataTypes, Optional } from 'sequelize';
import sequelize from '../database/connection';

interface TransactionAttributes {
  id: string;
  order_id: string | null;
  withdrawal_id: string | null;
  type: 'sale' | 'commission' | 'withdrawal' | 'fee' | 'refund';
  amount: number;
  fee: number;
  status: 'pending' | 'completed' | 'failed';
  description: string;
  created_at: Date;
}

interface TransactionCreationAttributes extends Optional<TransactionAttributes, 'id' | 'created_at'> {}

class Transaction extends Model<TransactionAttributes, TransactionCreationAttributes> implements TransactionAttributes {
  public id!: string;
  public order_id!: string | null;
  public withdrawal_id!: string | null;
  public type!: 'sale' | 'commission' | 'withdrawal' | 'fee' | 'refund';
  public amount!: number;
  public fee!: number;
  public status!: 'pending' | 'completed' | 'failed';
  public description!: string;
  public created_at!: Date;

  static associate(models: any) {
    Transaction.belongsTo(models.Order, { foreignKey: 'order_id', as: 'order' });
    Transaction.belongsTo(models.Withdrawal, { foreignKey: 'withdrawal_id', as: 'withdrawal' });
  }
}

Transaction.init(
  {
    id: {
      type: DataTypes.UUID,
      defaultValue: DataTypes.UUIDV4,
      primaryKey: true,
    },
    order_id: {
      type: DataTypes.UUID,
      allowNull: true,
      references: {
        model: 'orders',
        key: 'id',
      },
    },
    withdrawal_id: {
      type: DataTypes.UUID,
      allowNull: true,
      references: {
        model: 'withdrawals',
        key: 'id',
      },
    },
    type: {
      type: DataTypes.ENUM('sale', 'commission', 'withdrawal', 'fee', 'refund'),
      allowNull: false,
    },
    amount: {
      type: DataTypes.DECIMAL(10, 2),
      allowNull: false,
    },
    fee: {
      type: DataTypes.DECIMAL(10, 2),
      defaultValue: 0,
    },
    status: {
      type: DataTypes.ENUM('pending', 'completed', 'failed'),
      defaultValue: 'completed',
    },
    description: {
      type: DataTypes.TEXT,
      allowNull: true,
    },
    created_at: {
      type: DataTypes.DATE,
      defaultValue: DataTypes.NOW,
    },
  },
  {
    sequelize,
    modelName: 'Transaction',
    tableName: 'transactions',
    timestamps: true,
    underscored: true,
  }
);

export default Transaction;