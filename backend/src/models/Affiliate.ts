import { Model, DataTypes, Optional } from 'sequelize';
import sequelize from '../database/connection';
import { v4 as uuidv4 } from 'uuid';

interface AffiliateAttributes {
  id: string;
  user_id: string;
  affiliate_code: string;
  total_earnings: number;
  available_balance: number;
  total_clicks: number;
  total_sales: number;
  created_at: Date;
  updated_at: Date;
}

interface AffiliateCreationAttributes extends Optional<AffiliateAttributes, 'id' | 'created_at' | 'updated_at' | 'total_earnings' | 'available_balance' | 'total_clicks' | 'total_sales'> {}

class Affiliate extends Model<AffiliateAttributes, AffiliateCreationAttributes> implements AffiliateAttributes {
  public id!: string;
  public user_id!: string;
  public affiliate_code!: string;
  public total_earnings!: number;
  public available_balance!: number;
  public total_clicks!: number;
  public total_sales!: number;
  public created_at!: Date;
  public updated_at!: Date;

  static associate(models: any) {
    Affiliate.belongsTo(models.User, { foreignKey: 'user_id', as: 'user' });
    Affiliate.hasMany(models.Commission, { foreignKey: 'affiliate_id', as: 'commissions' });
    Affiliate.hasMany(models.Withdrawal, { foreignKey: 'affiliate_id', as: 'withdrawals' });
    Affiliate.hasMany(models.AffiliateClick, { foreignKey: 'affiliate_id', as: 'clicks' });
    Affiliate.hasMany(models.Order, { foreignKey: 'affiliate_id', as: 'orders' });
  }
}

Affiliate.init(
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
      references: {
        model: 'users',
        key: 'id',
      },
    },
    affiliate_code: {
      type: DataTypes.STRING(50),
      allowNull: false,
      unique: true,
      defaultValue: () => {
        const randomStr = Math.random().toString(36).substring(2, 10).toUpperCase();
        return `AF${randomStr}`;
      },
    },
    total_earnings: {
      type: DataTypes.DECIMAL(10, 2),
      defaultValue: 0,
    },
    available_balance: {
      type: DataTypes.DECIMAL(10, 2),
      defaultValue: 0,
    },
    total_clicks: {
      type: DataTypes.INTEGER,
      defaultValue: 0,
    },
    total_sales: {
      type: DataTypes.INTEGER,
      defaultValue: 0,
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
    modelName: 'Affiliate',
    tableName: 'affiliates',
    timestamps: true,
    underscored: true,
  }
);

export default Affiliate;