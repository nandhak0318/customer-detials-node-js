const sequelize = require('../db/database')
const Sequelize = require('sequelize')
const Customer = sequelize.define(
  'tbl_customer_detials',
  {
    id: {
      field: 'user_id',
      type: Sequelize.UUID,
      defaultValue: Sequelize.UUIDV4,
      allowNull: false,
      unique: true,
      primaryKey: true,
    },
    name: {
      field: 'user_name',
      type: Sequelize.STRING,
      allowNull: false,
      validate: {
        notNull: {
          msg: 'Please enter your name',
        },
      },
    },
    email: {
      field: 'user_email',
      type: Sequelize.STRING,
      allowNull: false,
      unique: true,
      validate: {
        isEmail: {
          msg: 'please enter a valid email',
        },
        notNull: {
          msg: `please enter your name`,
        },
      },
    },
    password: {
      field: 'user_password',
      type: Sequelize.STRING,
      allowNull: false,
    },
    image: {
      field: 'user_image',
      type: Sequelize.STRING,
      allowNull: false,
    },
    totalOrders: {
      field: 'total_orders',
      type: Sequelize.INTEGER,
      allowNull: false,
      defaultValue: 0,
      validate: {
        notNull: {
          msg: 'Please enter number of orders',
        },
        isInt: {
          msg: 'total orders must be an integer',
        },
      },
    },
    lastLoggedIn: {
      field: 'last_logged_in',
      type: Sequelize.DATE,
      allowNull: false,
    },
  },
  {
    updatedAt: 'updated_at',
    createdAt: 'created_at',
  },
)

module.exports = Customer
