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
        references: {
            model: Carts,
            key: "id",
        },
        field: "cart_id",
        allowNull: false,
    },
    productId: {
        type: DataTypes.INTEGER,
        references: {
            model: Products,
            key: "id",
        },
        field: "product_id",
        allowNull: false,
    },
    quantity: {
        type: DataTypes.SMALLINT,
        allowNull: false
    },
    price: {
        type: DataTypes.DOUBLE,
        allowNull: false
    },
    status: {
        type: DataTypes.ENUM('active', 'inactive', 'purchased'),
        defaultValue: 'active'
    }
});

module.exports = ProductsInCarts;