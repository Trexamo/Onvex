import { Model, DataTypes, Optional } from 'sequelize';
import sequelize from '../database/connection';

interface UserAttributes {
  id: string;
  email: string;
  password_hash: string;
  name: string;
  phone: string;
  document: string;
  role: 'customer' | 'affiliate' | 'admin';
  is_active: boolean;
  created_at: Date;
  updated_at: Date;
}

interface UserCreationAttributes extends Optional<UserAttributes, 'id' | 'created_at' | 'updated_at'> {}

class User extends Model<UserAttributes, UserCreationAttributes> implements UserAttributes {
  public id!: string;
  public email!: string;
  public password_hash!: string;
  public name!: string;
  public phone!: string;
  public document!: string;
  public role!: 'customer' | 'affiliate' | 'admin';
  public is_active!: boolean;
  public created_at!: Date;
  public updated_at!: Date;

  // Associations
  static associate(models: any) {
    User.hasOne(models.Affiliate, { foreignKey: 'user_id', as: 'affiliate' });
    User.hasMany(models.Order, { foreignKey: 'user_id', as: 'orders' });
    User.hasMany(models.Notification, { foreignKey: 'user_id', as: 'notifications' });
  }
}

User.init(
  {
    id: {
      type: DataTypes.UUID,
      defaultValue: DataTypes.UUIDV4,
      primaryKey: true,
    },
    email: {
      type: DataTypes.STRING(255),
      allowNull: false,
      unique: true,
      validate: {
        isEmail: true,
      },
    },
    password_hash: {
      type: DataTypes.STRING(255),
      allowNull: false,
    },
    name: {
      type: DataTypes.STRING(255),
      allowNull: false,
    },
    phone: {
      type: DataTypes.STRING(20),
      allowNull: true,
    },
    document: {
      type: DataTypes.STRING(20),
      allowNull: true,
    },
    role: {
      type: DataTypes.ENUM('customer', 'affiliate', 'admin'),
      defaultValue: 'customer',
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
    modelName: 'User',
    tableName: 'users',
    timestamps: true,
    underscored: true,
  }
);

export default User;