const db = require('../utils/database');
const { DataTypes } = require('sequelize');
const Users = require('./users.models');

const Carts = db.define('carts', {
    id: {
        primaryKey: true,
        type: DataTypes.INTEGER,
        autoIncrement: true,
        allowNull: false
    },
    userId: {
        type: DataTypes.INTEGER,
        references: {
            model: Users,
            key: "id",
        },
        field: "user_id",
        allowNull: false,
    },
    totalPrice: {
        type: DataTypes.DOUBLE,
        field: 'total_price'
    },
    status: {
        type: DataTypes.ENUM('active', 'inactive', 'purchased'),
        defaultValue: 'active'
    }
}, {
    timestamps: false
});

module.exports = Carts;