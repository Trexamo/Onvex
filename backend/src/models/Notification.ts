import { Model, DataTypes, Optional } from 'sequelize';
import sequelize from '../database/connection';

interface NotificationAttributes {
  id: string;
  user_id: string;
  type: 'order' | 'commission' | 'withdrawal' | 'system';
  title: string;
  message: string;
  data: object;
  is_read: boolean;
  created_at: Date;
  read_at: Date | null;
}

interface NotificationCreationAttributes extends Optional<NotificationAttributes, 'id' | 'created_at' | 'read_at' | 'is_read'> {}

class Notification extends Model<NotificationAttributes, NotificationCreationAttributes> implements NotificationAttributes {
  public id!: string;
  public user_id!: string;
  public type!: 'order' | 'commission' | 'withdrawal' | 'system';
  public title!: string;
  public message!: string;
  public data!: object;
  public is_read!: boolean;
  public created_at!: Date;
  public read_at!: Date | null;

  static associate(models: any) {
    Notification.belongsTo(models.User, { foreignKey: 'user_id', as: 'user' });
  }
}

Notification.init(
  {
    id: {
      type: DataTypes.UUID,
      defaultValue: DataTypes.UUIDV4,
      primaryKey: true,
    },
    user_id: {
      type: DataTypes.UUID,
      allowNull: false,
      references: {
        model: 'users',
        key: 'id',
      },
    },
    type: {
      type: DataTypes.ENUM('order', 'commission', 'withdrawal', 'system'),
      allowNull: false,
    },
    title: {
      type: DataTypes.STRING(255),
      allowNull: false,
    },
    message: {
      type: DataTypes.TEXT,
      allowNull: false,
    },
    data: {
      type: DataTypes.JSONB,
      defaultValue: {},
    },
    is_read: {
      type: DataTypes.BOOLEAN,
      defaultValue: false,
    },
    created_at: {
      type: DataTypes.DATE,
      defaultValue: DataTypes.NOW,
    },
    read_at: {
      type: DataTypes.DATE,
      allowNull: true,
    },
  },
  {
    sequelize,
    modelName: 'Notification',
    tableName: 'notifications',
    timestamps: true,
    underscored: true,
  }
);

export default Notification;