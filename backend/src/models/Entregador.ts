import { Model, DataTypes, Optional } from 'sequelize';
import sequelize from '../database/connection';

interface EntregadorAttributes {
  id: string;
  user_id: string;
  veiculo: string;
  placa: string;
  area_atuacao: string;
  status: 'disponivel' | 'em_rota' | 'indisponivel';
}

interface EntregadorCreationAttributes extends Optional<EntregadorAttributes, 'id'> {}

class Entregador extends Model<EntregadorAttributes, EntregadorCreationAttributes> {
  public id!: string;
  public user_id!: string;
  public veiculo!: string;
  public placa!: string;
  public area_atuacao!: string;
  public status!: 'disponivel' | 'em_rota' | 'indisponivel';

  static associate(models: any) {
    Entregador.belongsTo(models.User, { foreignKey: 'user_id', as: 'usuario' });
    Entregador.hasMany(models.Order, { foreignKey: 'entregador_id', as: 'entregas' });
  }
}

Entregador.init(
  {
    id: {
      type: DataTypes.UUID,
      defaultValue: DataTypes.UUIDV4,
      primaryKey: true,
    },
    user_id: {
      type: DataTypes.UUID,
      allowNull: false,
      unique: true,
      references: { model: 'users', key: 'id' },
    },
    veiculo: {
      type: DataTypes.STRING(100),
      allowNull: false,
    },
    placa: {
      type: DataTypes.STRING(10),
      allowNull: false,
    },
    area_atuacao: {
      type: DataTypes.STRING(100),
      allowNull: false,
    },
    status: {
      type: DataTypes.ENUM('disponivel', 'em_rota', 'indisponivel'),
      defaultValue: 'disponivel',
    },
  },
  {
    sequelize,
    modelName: 'Entregador',
    tableName: 'entregadores',
    timestamps: true,
    underscored: true,
  }
);

export default Entregador;
