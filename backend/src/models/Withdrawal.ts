import { Model, DataTypes, Optional } from 'sequelize';
import sequelize from '../database/connection';

interface WithdrawalAttributes {
  id: string;
  affiliate_id: string;
  amount: number;
  fee: number;
  net_amount: number;
  status: 'pending' | 'approved' | 'cancelled';
  payment_method: string;
  payment_details: object;
  approved_by: string | null;
  approved_at: Date | null;
  created_at: Date;
  updated_at: Date;
}

interface WithdrawalCreationAttributes extends Optional<WithdrawalAttributes, 'id' | 'created_at' | 'updated_at' | 'approved_at'> {}

class Withdrawal extends Model<WithdrawalAttributes, WithdrawalCreationAttributes> implements WithdrawalAttributes {
  public id!: string;
  public affiliate_id!: string;
  public amount!: number;
  public fee!: number;
  public net_amount!: number;
  public status!: 'pending' | 'approved' | 'cancelled';
  public payment_method!: string;
  public payment_details!: object;
  public approved_by!: string | null;
  public approved_at!: Date | null;
  public created_at!: Date;
  public updated_at!: Date;

  static associate(models: any) {
    Withdrawal.belongsTo(models.Affiliate, { foreignKey: 'affiliate_id', as: 'affiliate' });
    Withdrawal.belongsTo(models.User, { foreignKey: 'approved_by', as: 'approver' });
    Withdrawal.hasMany(models.Transaction, { foreignKey: 'withdrawal_id', as: 'transactions' });
  }
}

Withdrawal.init(
  {
    id: {
      type: DataTypes.UUID,
      defaultValue: DataTypes.UUIDV4,
      primaryKey: true,
    },
    affiliate_id: {
      type: DataTypes.UUID,
      allowNull: false,
      references: {
        model: 'affiliates',
        key: 'id',
      },
    },
    amount: {
      type: DataTypes.DECIMAL(10, 2),
      allowNull: false,
      validate: {
        min: 1,
      },
    },
    fee: {
      type: DataTypes.DECIMAL(10, 2),
      defaultValue: 3.99,
    },
    net_amount: {
      type: DataTypes.DECIMAL(10, 2),
      allowNull: true,
    },
    status: {
      type: DataTypes.ENUM('pending', 'approved', 'cancelled'),
      defaultValue: 'pending',
    },
    payment_method: {
      type: DataTypes.STRING(50),
      allowNull: false,
    },
    payment_details: {
      type: DataTypes.JSONB,
      allowNull: false,
    },
    approved_by: {
      type: DataTypes.UUID,
      allowNull: true,
      references: {
        model: 'users',
        key: 'id',
      },
    },
    approved_at: {
      type: DataTypes.DATE,
      allowNull: true,
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
    modelName: 'Withdrawal',
    tableName: 'withdrawals',
    timestamps: true,
    underscored: true,
    hooks: {
      beforeCreate: (withdrawal: Withdrawal) => {
        withdrawal.net_amount = withdrawal.amount - withdrawal.fee;
      },
    },
  }
);

export default Withdrawal;