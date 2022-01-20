require('dotenv').config()
const Sequelize = require('sequelize')

const sequelize = new Sequelize(
  process.env.DB_NAME,
  process.env.DB_USER_NAME,
  process.env.DB_PASSWORD,
  {
    dialect: 'mysql',
    host: process.env.DB_HOST,
    port: process.env.PORT,
    ssl: 'Amazon RDS',
  pool: { maxConnections: 5, maxIdleTime: 30 },
  language: 'en',
  },
)

module.exports = sequelize
