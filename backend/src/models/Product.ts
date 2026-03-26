import { Model, DataTypes, Optional } from 'sequelize';
import sequelize from '../database/connection';

interface ProductAttributes {
  id: string;
  name: string;
  description: string;
  price: number;
  stock_quantity: number;
  commission_percentage: number;
  image_url: string;
  is_active: boolean;
  created_at: Date;
  updated_at: Date;
}

interface ProductCreationAttributes extends Optional<ProductAttributes, 'id' | 'created_at' | 'updated_at'> {}

class Product extends Model<ProductAttributes, ProductCreationAttributes> implements ProductAttributes {
  public id!: string;
  public name!: string;
  public description!: string;
  public price!: number;
  public stock_quantity!: number;
  public commission_percentage!: number;
  public image_url!: string;
  public is_active!: boolean;
  public created_at!: Date;
  public updated_at!: Date;

  static associate(models: any) {
    Product.belongsToMany(models.City, { 
      through: models.ProductCity, 
      foreignKey: 'product_id',
      as: 'cities' 
    });
    Product.hasMany(models.OrderItem, { foreignKey: 'product_id', as: 'order_items' });
    Product.hasMany(models.StockTransfer, { foreignKey: 'product_id', as: 'stock_transfers' });
    Product.hasMany(models.AffiliateClick, { foreignKey: 'product_id', as: 'clicks' });
  }
}

Product.init(
  {
    id: {
      type: DataTypes.UUID,
      defaultValue: DataTypes.UUIDV4,
      primaryKey: true,
    },
    name: {
      type: DataTypes.STRING(255),
      allowNull: false,
    },
    description: {
      type: DataTypes.TEXT,
      allowNull: true,
    },
    price: {
      type: DataTypes.DECIMAL(10, 2),
      allowNull: false,
      validate: {
        min: 0,
      },
    },
    stock_quantity: {
      type: DataTypes.INTEGER,
      allowNull: false,
      defaultValue: 0,
      validate: {
        min: 0,
      },
    },
    commission_percentage: {
      type: DataTypes.DECIMAL(5, 2),
      defaultValue: 0,
      validate: {
        min: 0,
        max: 100,
      },
    },
    image_url: {
      type: DataTypes.TEXT,
      allowNull: true,
    },
    is_active: {
      type: DataTypes.BOOLEAN,
      defaultValue: true,
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
    modelName: 'Product',
    tableName: 'products',
    timestamps: true,
    underscored: true,
  }
);

export default Product;