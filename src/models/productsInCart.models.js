const db = require('../utils/database');
const { DataTypes } = require('sequelize');
const Carts  = require('./carts.models');
const Products = require('./products.models');

const ProductsInCarts = db.define('products_in_carts', {
    id: {
        primaryKey: true,
        autoIncrement: true,
        type: DataTypes.INTEGER,
        allowNull: false,
    },
    cartId: {
        type: DataTypes.INTEGER,
        allowNull: false,
        field: "cart_id",
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
        type: DataTypes.DOUBLE,
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

module.exports = ProductsInCarts;