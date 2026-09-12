require('dotenv').config({
  path: require('path').resolve(__dirname, '../../.env')
});
const {
  Sequelize
} = require('sequelize');

const sequelize = new Sequelize(
  process.env.DB_NAME || 'portfolio_pro',
  process.env.DB_USER || 'root',
  process.env.DB_PASS || '', {
    host: process.env.DB_HOST || '127.0.0.1',
    port: parseInt(process.env.DB_PORT || '3306', 10),
    dialect: 'mysql',
    logging: process.env.NODE_ENV === 'development' ? false : false,
    define: {
      underscored: false,
      freezeTableName: true
    },
    pool: {
      max: 10,
      min: 0,
      acquire: 30000,
      idle: 10000
    },
    timezone: '+00:00',
  }
);

module.exports = sequelize;