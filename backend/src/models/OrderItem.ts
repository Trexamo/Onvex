import { Model, DataTypes, Optional } from 'sequelize';
import sequelize from '../database/connection';

interface OrderItemAttributes {
  id: string;
  order_id: string;
  product_id: string;
  quantity: number;
  unit_price: number;
  subtotal: number;
  commission_amount: number;
  created_at: Date;
}

interface OrderItemCreationAttributes extends Optional<OrderItemAttributes, 'id' | 'created_at'> {}

class OrderItem extends Model<OrderItemAttributes, OrderItemCreationAttributes> implements OrderItemAttributes {
  public id!: string;
  public order_id!: string;
  public product_id!: string;
  public quantity!: number;
  public unit_price!: number;
  public subtotal!: number;
  public commission_amount!: number;
  public created_at!: Date;

  static associate(models: any) {
    OrderItem.belongsTo(models.Order, { foreignKey: 'order_id', as: 'order' });
    OrderItem.belongsTo(models.Product, { foreignKey: 'product_id', as: 'product' });
    OrderItem.hasOne(models.Commission, { foreignKey: 'order_item_id', as: 'commission' });
  }
}

OrderItem.init(
  {
    id: {
      type: DataTypes.UUID,
      defaultValue: DataTypes.UUIDV4,
      primaryKey: true,
    },
    order_id: {
      type: DataTypes.UUID,
      allowNull: false,
      references: {
        model: 'orders',
        key: 'id',
      },
    },
    product_id: {
      type: DataTypes.UUID,
      allowNull: false,
      references: {
        model: 'products',
        key: 'id',
      },
    },
    quantity: {
      type: DataTypes.INTEGER,
      allowNull: false,
      validate: {
        min: 1,
      },
    },
    unit_price: {
      type: DataTypes.DECIMAL(10, 2),
      allowNull: false,
    },
    subtotal: {
      type: DataTypes.DECIMAL(10, 2),
      allowNull: false,
    },
    commission_amount: {
      type: DataTypes.DECIMAL(10, 2),
      defaultValue: 0,
    },
    created_at: {
      type: DataTypes.DATE,
      defaultValue: DataTypes.NOW,
    },
  },
  {
    sequelize,
    modelName: 'OrderItem',
    tableName: 'order_items',
    timestamps: true,
    underscored: true,
    hooks: {
      beforeCreate: (item: OrderItem) => {
        item.subtotal = item.quantity * item.unit_price;
      },
    },
  }
);

export default OrderItem;