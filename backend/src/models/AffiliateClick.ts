import { Model, DataTypes, Optional } from 'sequelize';
import sequelize from '../database/connection';

interface AffiliateClickAttributes {
  id: string;
  affiliate_id: string;
  product_id: string;
  ip_address: string;
  user_agent: string;
  clicked_at: Date;
}

interface AffiliateClickCreationAttributes extends Optional<AffiliateClickAttributes, 'id' | 'clicked_at'> {}

class AffiliateClick extends Model<AffiliateClickAttributes, AffiliateClickCreationAttributes> implements AffiliateClickAttributes {
  public id!: string;
  public affiliate_id!: string;
  public product_id!: string;
  public ip_address!: string;
  public user_agent!: string;
  public clicked_at!: Date;

  static associate(models: any) {
    AffiliateClick.belongsTo(models.Affiliate, { foreignKey: 'affiliate_id', as: 'affiliate' });
    AffiliateClick.belongsTo(models.Product, { foreignKey: 'product_id', as: 'product' });
  }
}

AffiliateClick.init(
  {
    id: {
      type: DataTypes.UUID,
      defaultValue: DataTypes.UUIDV4,
      primaryKey: true,
    },
    affiliate_id: {
      type: DataTypes.UUID,
      allowNull: false,
      references: {
        model: 'affiliates',
        key: 'id',
      },
    },
    product_id: {
      type: DataTypes.UUID,
      allowNull: false,
      references: {
        model: 'products',
        key: 'id',
      },
    },
    ip_address: {
      type: DataTypes.STRING(45),
      allowNull: true,
    },
    user_agent: {
      type: DataTypes.TEXT,
      allowNull: true,
    },
    clicked_at: {
      type: DataTypes.DATE,
      defaultValue: DataTypes.NOW,
    },
  },
  {
    sequelize,
    modelName: 'AffiliateClick',
    tableName: 'affiliate_clicks',
    timestamps: false,
    underscored: true,
  }
);

export default AffiliateClick;