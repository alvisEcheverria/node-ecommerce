const db = require('../utils/database');
const { DataTypes } = require('sequelize');
const Orders = require('./orders.models');
const Products = require('./products.models');

const ProductsInOrders = db.define('products_in_orders', {
    id: {
        primaryKey: true,
        autoIncrement: true,
        type: DataTypes.INTEGER,
        allowNull: false,
    },
    orderId: {
        type: DataTypes.INTEGER,
        allowNull: false,
        field: "order_id",
    },
    productId: {
        type: DataTypes.INTEGER,
        allowNull: false,
        field: "product_id",
    },
    quantity: {
        type: DataTypes.SMALLINT,
        allowNull: false
    },
    price: {
        type: DataTypes.FLOAT,
        allowNull: false
    },
    subTotal: {
        type: DataTypes.FLOAT,
        allowNull: false,
        field: 'sub_total'
    },
    status: {
        type: DataTypes.ENUM('active', 'inactive', 'purchased'),
        defaultValue: 'active'
    }
});

module.exports = ProductsInOrders;
