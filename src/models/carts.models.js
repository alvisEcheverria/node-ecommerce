const db = require('../utils/database');
const { DataTypes } = require('sequelize');
const Users = require('./users.models');

/**
 * @openapi
 * components:
 *   schemas:
 *     add product to cart:
 *       type: object
 *       properties:
 *         productId:
 *           type: integer
 *           example: 1
 *         quantity: 
 *           type: integer
 *           example: 4
 *     update product in cart:
 *       type: object
 *       properties:
 *         productId:
 *           type: string
 *           example: 1
 *         newQuantity:
 *           type: integer
 *           example: 2
 */

const Carts = db.define('carts', {
    id: {
        primaryKey: true,
        type: DataTypes.INTEGER,
        autoIncrement: true,
        allowNull: false
    },
    userId: {
        type: DataTypes.INTEGER,
        allowNull: false,
        field: "user_id",
    },
    totalPrice: {
        type: DataTypes.FLOAT,
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