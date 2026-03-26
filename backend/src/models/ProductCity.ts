import { Model, DataTypes } from 'sequelize';
import sequelize from '../database/connection';

class ProductCity extends Model {
  public product_id!: string;
  public city_id!: string;
  public is_available!: boolean;

  static associate(models: any) {
    // No need to define associations here as they're defined in Product and City
  }
}

ProductCity.init(
  {
    product_id: {
      type: DataTypes.UUID,
      allowNull: false,
      references: {
        model: 'products',
        key: 'id',
      },
      primaryKey: true,
    },
    city_id: {
      type: DataTypes.UUID,
      allowNull: false,
      references: {
        model: 'cities',
        key: 'id',
      },
      primaryKey: true,
    },
    is_available: {
      type: DataTypes.BOOLEAN,
      defaultValue: true,
    },
  },
  {
    sequelize,
    modelName: 'ProductCity',
    tableName: 'product_cities',
    timestamps: false,
    underscored: true,
  }
);

export default ProductCity;