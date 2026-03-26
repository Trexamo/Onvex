import { Model, DataTypes, Optional } from 'sequelize';
import sequelize from '../database/connection';

interface StateAttributes {
  id: string;
  name: string;
  uf: string;
  is_active: boolean;
  created_at: Date;
  updated_at: Date;
}

interface StateCreationAttributes extends Optional<StateAttributes, 'id' | 'created_at' | 'updated_at'> {}

class State extends Model<StateAttributes, StateCreationAttributes> implements StateAttributes {
  public id!: string;
  public name!: string;
  public uf!: string;
  public is_active!: boolean;
  public created_at!: Date;
  public updated_at!: Date;

  static associate(models: any) {
    State.hasMany(models.City, { foreignKey: 'state_id', as: 'cities' });
  }
}

State.init(
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
    uf: {
      type: DataTypes.CHAR(2),
      allowNull: false,
      unique: true,
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
    modelName: 'State',
    tableName: 'states',
    timestamps: true,
    underscored: true,
  }
);

export default State;