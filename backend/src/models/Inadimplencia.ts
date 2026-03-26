import { Model, DataTypes, Optional } from 'sequelize';
import sequelize from '../database/connection';

interface InadimplenciaAttributes {
  id: string;
  cliente_id: string;
  order_id: string;
  motivo: string;
  data_ocorrencia: Date;
}

interface InadimplenciaCreationAttributes extends Optional<InadimplenciaAttributes, 'id'> {}

class Inadimplencia extends Model<InadimplenciaAttributes, InadimplenciaCreationAttributes> {
  public id!: string;
  public cliente_id!: string;
  public order_id!: string;
  public motivo!: string;
  public data_ocorrencia!: Date;

  static associate(models: any) {
    Inadimplencia.belongsTo(models.User, { foreignKey: 'cliente_id', as: 'cliente' });
    Inadimplencia.belongsTo(models.Order, { foreignKey: 'order_id', as: 'order' });
  }
}

Inadimplencia.init(
  {
    id: {
      type: DataTypes.UUID,
      defaultValue: DataTypes.UUIDV4,
      primaryKey: true,
    },
    cliente_id: {
      type: DataTypes.UUID,
      allowNull: false,
      references: { model: 'users', key: 'id' },
    },
    order_id: {
      type: DataTypes.UUID,
      allowNull: false,
      references: { model: 'orders', key: 'id' },
    },
    motivo: {
      type: DataTypes.STRING(255),
      allowNull: false,
    },
    data_ocorrencia: {
      type: DataTypes.DATE,
      defaultValue: DataTypes.NOW,
    },
  },
  {
    sequelize,
    modelName: 'Inadimplencia',
    tableName: 'inadimplencias',
    timestamps: false,
    underscored: true,
  }
);

export default Inadimplencia;
