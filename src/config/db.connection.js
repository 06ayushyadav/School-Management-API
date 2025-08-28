=
import { Sequelize } from 'sequelize';
const sequelize = new Sequelize(
  process.env.MYSQLDATABASE || process.env.DB_NAME || 'schoolDB',
  process.env.MYSQLUSER || process.env.DB_USER || 'root',
  process.env.MYSQLPASSWORD || process.env.DB_PASSWORD || '',

  {
    host: process.env.MYSQLHOST || process.env.DB_HOST || 'localhost',
    dialect: 'mysql',
    port: process.env.MYSQLPORT || process.env.DB_PORT || 3306,
    logging: console.log, 
    dialectOptions: {
      connectTimeout: 60000
    }
  }
);
export const testConnection = async () => {
  try {
    console.log('🔗 Attempting database connection...');
    console.log('Using configuration:');
    console.log('- Host:', process.env.MYSQLHOST || process.env.DB_HOST || 'localhost');
    console.log('- Database:', process.env.MYSQLDATABASE || process.env.DB_NAME || 'schoolDB');
    console.log('- User:', process.env.MYSQLUSER || process.env.DB_USER || 'root');
    
    await sequelize.authenticate();
    console.log('Database connected successfully');
    return true;
  } catch (error) {
    console.error('Database connection failed:', error.message);
    return false;
  }
};
export default sequelize;