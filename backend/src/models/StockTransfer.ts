import { Model, DataTypes, Optional } from 'sequelize';
import sequelize from '../database/connection';

interface StockTransferAttributes {
  id: string;
  product_id: string;
  from_location: string;
  to_location: string;
  quantity: number;
  type: 'transfer' | 'adjustment' | 'return';
  invoice_number: string | null;
  digisan_protocol: string | null;
  created_by: string;
  created_at: Date;
  completed_at: Date | null;
}

interface StockTransferCreationAttributes extends Optional<StockTransferAttributes, 'id' | 'created_at' | 'completed_at'> {}

class StockTransfer extends Model<StockTransferAttributes, StockTransferCreationAttributes> implements StockTransferAttributes {
  public id!: string;
  public product_id!: string;
  public from_location!: string;
  public to_location!: string;
  public quantity!: number;
  public type!: 'transfer' | 'adjustment' | 'return';
  public invoice_number!: string | null;
  public digisan_protocol!: string | null;
  public created_by!: string;
  public created_at!: Date;
  public completed_at!: Date | null;

  static associate(models: any) {
    StockTransfer.belongsTo(models.Product, { foreignKey: 'product_id', as: 'product' });
    StockTransfer.belongsTo(models.User, { foreignKey: 'created_by', as: 'creator' });
  }
}

StockTransfer.init(
  {
    id: {
      type: DataTypes.UUID,
      defaultValue: DataTypes.UUIDV4,
      primaryKey: true,
    },
    product_id: {
      type: DataTypes.UUID,
      allowNull: false,
      references: {
        model: 'products',
        key: 'id',
      },
    },
    from_location: {
      type: DataTypes.STRING(100),
      allowNull: false,
    },
    to_location: {
      type: DataTypes.STRING(100),
      allowNull: false,
    },
    quantity: {
      type: DataTypes.INTEGER,
      allowNull: false,
      validate: {
        min: 1,
      },
    },
    type: {
      type: DataTypes.ENUM('transfer', 'adjustment', 'return'),
      allowNull: false,
    },
    invoice_number: {
      type: DataTypes.STRING(100),
      allowNull: true,
    },
    digisan_protocol: {
      type: DataTypes.STRING(100),
      allowNull: true,
    },
    created_by: {
      type: DataTypes.UUID,
      allowNull: false,
      references: {
        model: 'users',
        key: 'id',
      },
    },
    created_at: {
      type: DataTypes.DATE,
      defaultValue: DataTypes.NOW,
    },
    completed_at: {
      type: DataTypes.DATE,
      allowNull: true,
    },
  },
  {
    sequelize,
    modelName: 'StockTransfer',
    tableName: 'stock_transfers',
    timestamps: true,
    underscored: true,
  }
);

export default StockTransfer;