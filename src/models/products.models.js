const db = require('../utils/database');
const { DataTypes } = require('sequelize');
const Users = require('./users.models');
const Categories = require('./categories.models');

/**
 * @openapi
 * components:
 *   schemas:
 *     product:
 *       type: object
 *       properties:
 *         title:
 *           type: string
 *           example: "string"
 *         description:
 *           type: string
 *           example: "string"
 *         price:
 *           type: integer
 *           example: "integer"
 *         productImgs: 
 *           type: array
 *           example: ["url"]
 *         quantity: 
 *           type: integer
 *           example: "integer"
 *         categoryId: 
 *           type: integer
 *           example: "integer"
 *     create product:
 *       type: object
 *       properties:
 *         title:
 *           type: string
 *           example: Mouse
 *         description:
 *           type: string
 *           example: Mouse Gamer
 *         price:
 *           type: integer
 *           example: 30.55
 *         productImgs: 
 *           type: array
 *           example: ["http://products/mousefront.img", "http://products/mouseback.img", "http://products/mousewhite.img"]
 *         quantity: 
 *           type: integer
 *           example: 20
 *         categoryId: 
 *           type: integer
 *           example: 1
 *     update product:
 *       type: object
 *       properties:
 *         title:
 *           type: string
 *           example: Nevera
 *         description:
 *           type: string
 *           example: Enfria mucho
 *         price:
 *           type: integer
 *           example: 1300.99
 *         quantity:
 *           type: integer
 *           example: 5
 */

const Products = db.define('products', {
    id: {
        primaryKey: true,
        type: DataTypes.INTEGER,
        allowNull: false,
        autoIncrement: true
    },
    title: {
        type: DataTypes.STRING,
        allowNull: false,
    },
    description: {
        type: DataTypes.TEXT,
        allowNull: false
    },
    price: {
        type: DataTypes.FLOAT,
        allowNull: false
    },
    productImgs: {
        type: DataTypes.ARRAY(DataTypes.STRING),
        allowNull: false,
        field: 'product_imgs'
    },
    quantity: {
        type: DataTypes.SMALLINT,
        allowNull: false
    },
    status: {
        type: DataTypes.ENUM('active', 'inactive'),
        defaultValue: 'active'
    },
    categoryId: {
        type: DataTypes.INTEGER,
        references: {
            model: Categories,
            key: "id",
        },
        field: "category_id",
        allowNull: false,
    },
    userId: {
        type: DataTypes.INTEGER,
        references: {
            model: Users,
            key: "id",
        },
        field: "user_id",
        allowNull: false,
    }
});

module.exports = Products;