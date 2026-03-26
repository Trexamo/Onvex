import { Model, DataTypes, Optional } from 'sequelize';
import sequelize from '../database/connection';

interface SettingAttributes {
  id: string;
  key: string;
  value: object;
  description: string;
  updated_at: Date;
}

interface SettingCreationAttributes extends Optional<SettingAttributes, 'id' | 'updated_at'> {}

class Setting extends Model<SettingAttributes, SettingCreationAttributes> implements SettingAttributes {
  public id!: string;
  public key!: string;
  public value!: object;
  public description!: string;
  public updated_at!: Date;
}

Setting.init(
  {
    id: {
      type: DataTypes.UUID,
      defaultValue: DataTypes.UUIDV4,
      primaryKey: true,
    },
    key: {
      type: DataTypes.STRING(100),
      allowNull: false,
      unique: true,
    },
    value: {
      type: DataTypes.JSONB,
      allowNull: false,
    },
    description: {
      type: DataTypes.TEXT,
      allowNull: true,
    },
    updated_at: {
      type: DataTypes.DATE,
      defaultValue: DataTypes.NOW,
    },
  },
  {
    sequelize,
    modelName: 'Setting',
    tableName: 'settings',
    timestamps: true,
    underscored: true,
  }
);

export default Setting;