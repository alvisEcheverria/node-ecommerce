const db = require('../utils/database');
const { DataTypes } = require('sequelize');
const Users = require('./users.models');

const Orders = db.define('orders', {
    id: {
        primaryKey: true,
        autoIncrement: true,
        type: DataTypes.INTEGER,
        allowNull: false,
    },
    cartId: {
        type: DataTypes.INTEGER,
        allowNull: false,
        field: 'cart_id'
    }, 
    userId: {
        type: DataTypes.INTEGER,
        allowNull: false,
        field: "user_id",
    },
    totalPrice: {
        type: DataTypes.FLOAT,
        allowNull: false,
        field: 'total_price'
    },
    status: {
        type: DataTypes.ENUM('active', 'inactive', 'purchased'),
        defaultValue: 'active'
    }
});

module.exports = Orders;