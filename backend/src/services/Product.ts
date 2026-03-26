import { Model, DataTypes, Optional } from 'sequelize';
import sequelize from '../database/connection';

interface ProductAttributes {
  id: string;
  vendedor_id: string;
  nome: string;
  descricao: string;
  preco: number;
  estoque: number;
  imagem: string;
  is_bump: boolean;
  produto_bump_id: string | null;
  created_at: Date;
  updated_at: Date;
}

class Product extends Model<ProductAttributes> {
  public id!: string;
  public vendedor_id!: string;
  public nome!: string;
  public descricao!: string;
  public preco!: number;
  public estoque!: number;
  public imagem!: string;
  public is_bump!: boolean;
  public produto_bump_id!: string | null;

  static associate(models: any) {
    Product.belongsTo(models.User, { foreignKey: 'vendedor_id', as: 'vendedor' });
    Product.belongsTo(models.Product, { foreignKey: 'produto_bump_id', as: 'bump' });
    Product.hasMany(models.OrderItem, { foreignKey: 'product_id', as: 'itens' });
  }
}

Product.init(
  {
    id: {
      type: DataTypes.UUID,
      defaultValue: DataTypes.UUIDV4,
      primaryKey: true,
    },
    vendedor_id: {
      type: DataTypes.UUID,
      allowNull: false,
      references: { model: 'users', key: 'id' },
    },
    nome: {
      type: DataTypes.STRING(255),
      allowNull: false,
    },
    descricao: {
      type: DataTypes.TEXT,
      allowNull: true,
    },
    preco: {
      type: DataTypes.DECIMAL(10, 2),
      allowNull: false,
    },
    estoque: {
      type: DataTypes.INTEGER,
      defaultValue: 0,
    },
    imagem: {
      type: DataTypes.STRING(500),
      allowNull: true,
    },
    is_bump: {
      type: DataTypes.BOOLEAN,
      defaultValue: false,
    },
    produto_bump_id: {
      type: DataTypes.UUID,
      allowNull: true,
      references: { model: 'products', key: 'id' },
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
