import { Model, DataTypes, Optional } from 'sequelize';
import sequelize from '../database/connection';

interface CommissionAttributes {
  id: string;
  affiliate_id: string;
  order_id: string;
  order_item_id: string;
  amount: number;
  status: 'pending' | 'paid' | 'cancelled';
  platform_fee: number;
  net_amount: number;
  created_at: Date;
  paid_at: Date | null;
}

interface CommissionCreationAttributes extends Optional<CommissionAttributes, 'id' | 'created_at' | 'paid_at'> {}

class Commission extends Model<CommissionAttributes, CommissionCreationAttributes> implements CommissionAttributes {
  public id!: string;
  public affiliate_id!: string;
  public order_id!: string;
  public order_item_id!: string;
  public amount!: number;
  public status!: 'pending' | 'paid' | 'cancelled';
  public platform_fee!: number;
  public net_amount!: number;
  public created_at!: Date;
  public paid_at!: Date | null;

  static associate(models: any) {
    Commission.belongsTo(models.Affiliate, { foreignKey: 'affiliate_id', as: 'affiliate' });
    Commission.belongsTo(models.Order, { foreignKey: 'order_id', as: 'order' });
    Commission.belongsTo(models.OrderItem, { foreignKey: 'order_item_id', as: 'order_item' });
  }
}

Commission.init(
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
    order_id: {
      type: DataTypes.UUID,
      allowNull: false,
      references: {
        model: 'orders',
        key: 'id',
      },
    },
    order_item_id: {
      type: DataTypes.UUID,
      allowNull: false,
      references: {
        model: 'order_items',
        key: 'id',
      },
    },
    amount: {
      type: DataTypes.DECIMAL(10, 2),
      allowNull: false,
    },
    status: {
      type: DataTypes.ENUM('pending', 'paid', 'cancelled'),
      defaultValue: 'pending',
    },
    platform_fee: {
      type: DataTypes.DECIMAL(10, 2),
      defaultValue: 0,
    },
    net_amount: {
      type: DataTypes.DECIMAL(10, 2),
      allowNull: true,
    },
    created_at: {
      type: DataTypes.DATE,
      defaultValue: DataTypes.NOW,
    },
    paid_at: {
      type: DataTypes.DATE,
      allowNull: true,
    },
  },
  {
    sequelize,
    modelName: 'Commission',
    tableName: 'commissions',
    timestamps: true,
    underscored: true,
  }
);

export default Commission;