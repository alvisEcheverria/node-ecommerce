const db = require('../utils/database');
const { DataTypes } = require('sequelize');
const Users = require('./users.models');
const Categories = require('./categories.models');

/**
 * @openapi
 * components:
 *   schemas:
 *     products:
 *       type: object
 *       properties:
 *         title:
 *           type: string
 *           example: MacBook Air 13.3\" Laptop - Apple M1 chip 
 *         description:
 *           type: string
 *           example: Echeverria
 *         email:
 *           type: string
 *           example: alvis@gmail.com
 *         phone: 
 *           type: string
 *           example: 1234567890
 *     register:
 *       type: object
 *       properties:
 *         firstName:
 *           type: string
 *           example: Alvis
 *         lastName:
 *           type: string
 *           example: Echeverria
 *         email:
 *           type: string
 *           example: alvis@gmail.com
 *         phone:
 *           type: string
 *           example: 1234567890
 *         password:
 *           type: string
 *           example: 1234
 *     updateUser:
 *       type: object
 *       properties:
 *         password:
 *           type: string
 *           example: 1234
 *     token:
 *       type: object
 *       properties:
 *         token:
 *           type: string
 *           example: Bearer eyJhbGciOiJIUzUxMiIsInR5cCI6IkpXVCJ9.eyJpZCI6MywiZmlyc3ROYW1lIjoiQWx2aXMiLCJsYXN0TmFtZSI6IkVjaGV2ZXJyaWEiLCJlbWFpbCI6ImFsdmlzLmNtQGdtYWlsLmNvbSIsInBob25lIjoiMTIzNDU2NzgzMCIsImlhdCI6MTY2OTk5MzU3NSwiZXhwIjoxNjcwMDc5OTc1fQ.Xy7pTLR_B34908YSO4p6xZ-rdPZLJNkLgz4925aOD4Le-G5O28efp1vJSLLpMUJRkM2xFLuo2VwxrfSwAj7JPg
 *   securitySchemes:
 *      bearerAuth:
 *        type: http
 *        scheme: bearer
 *        bearerFormat: JWT
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
        type: DataTypes.DOUBLE,
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