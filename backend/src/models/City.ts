import { Model, DataTypes, Optional } from 'sequelize';
import sequelize from '../database/connection';

interface CityAttributes {
  id: string;
  name: string;
  state_id: string;
  is_active: boolean;
  delivery_fee: number;
  estimated_delivery_days: number;
  cutoff_time: string;
  created_at: Date;
  updated_at: Date;
}

interface CityCreationAttributes extends Optional<CityAttributes, 'id' | 'created_at' | 'updated_at'> {}

class City extends Model<CityAttributes, CityCreationAttributes> implements CityAttributes {
  public id!: string;
  public name!: string;
  public state_id!: string;
  public is_active!: boolean;
  public delivery_fee!: number;
  public estimated_delivery_days!: number;
  public cutoff_time!: string;
  public created_at!: Date;
  public updated_at!: Date;

  static associate(models: any) {
    City.belongsTo(models.State, { foreignKey: 'state_id', as: 'state' });
    City.belongsToMany(models.Product, { 
      through: models.ProductCity, 
      foreignKey: 'city_id',
      as: 'products' 
    });
    City.hasMany(models.Order, { foreignKey: 'city_id', as: 'orders' });
  }
}

City.init(
  {
    id: {
      type: DataTypes.UUID,
      defaultValue: DataTypes.UUIDV4,
      primaryKey: true,
    },
    name: {
      type: DataTypes.STRING(100),
      allowNull: false,
    },
    state_id: {
      type: DataTypes.UUID,
      allowNull: false,
      references: {
        model: 'states',
        key: 'id',
      },
    },
    is_active: {
      type: DataTypes.BOOLEAN,
      defaultValue: false,
    },
    delivery_fee: {
      type: DataTypes.DECIMAL(10, 2),
      defaultValue: 0,
    },
    estimated_delivery_days: {
      type: DataTypes.INTEGER,
      defaultValue: 1,
    },
    cutoff_time: {
      type: DataTypes.STRING(8),
      defaultValue: '18:00:00',
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
    modelName: 'City',
    tableName: 'cities',
    timestamps: true,
    underscored: true,
    indexes: [
      {
        unique: true,
        fields: ['name', 'state_id'],
      },
    ],
  }
);

export default City;