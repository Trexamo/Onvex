import { Sequelize } from 'sequelize';
import dotenv from 'dotenv';

dotenv.config();

const sequelize = new Sequelize(
  process.env.DB_NAME || 'logzz_marketplace',
  process.env.DB_USER || 'postgres',
  process.env.DB_PASSWORD || 'postgres',
  {
    host: process.env.DB_HOST || 'localhost',
    port: Number(process.env.DB_PORT) || 5432,
    dialect: 'postgres',
    logging: process.env.NODE_ENV === 'development' ? console.log : false,
    define: {
      timestamps: true,
      underscored: true,
    },
  }
);

export const connectDatabase = async () => {
  try {
    await sequelize.authenticate();
    console.log('📦 Conexão com PostgreSQL estabelecida com sucesso.');
    
    // Sincronizar modelos (apenas em desenvolvimento)
    if (process.env.NODE_ENV === 'development') {
      await sequelize.sync({ alter: true });
      console.log('📊 Modelos sincronizados com o banco de dados.');
    }
  } catch (error) {
    console.error('❌ Erro ao conectar com PostgreSQL:', error);
    process.exit(1);
  }
};

export default sequelize;