const db = require('../utils/database');
const { DataTypes } = require('sequelize');
const bcrypt = require('bcrypt');

/**
 * @openapi
 * components:
 *   schemas:
 *     user:
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
 *           example: alvis.cm@gmail.com
 *         phone: 
 *           type: string
 *           example: 1234567890
 *     register user:
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
 *           example: alvis.cm@gmail.com
 *         phone:
 *           type: string
 *           example: 1234567890
 *         password:
 *           type: string
 *           example: 12345678
 *     update user:
 *       type: object
 *       properties:
 *         password:
 *           type: string
 *           example: 1234567a
 *   securitySchemes:
 *      bearerAuth:
 *        type: http
 *        scheme: bearer
 *        bearerFormat: JWT
 */

const Users = db.define('users', {
    id: {
        primaryKey: true,
        type: DataTypes.INTEGER,
        autoIncrement: true,
        allowNull: false
    },
    firstName: {
        type: DataTypes.STRING,
        allowNull: false,
        field: 'first_name'
    },
    lastName: {
        type: DataTypes.STRING,
        allowNull: false,
        field: 'last_name'
    },
    email: {
        type: DataTypes.STRING,
        unique: true,
        allowNull: false,
        validate: {
            isEmail: true
        }
    },
    password: {
        type: DataTypes.STRING,
        allowNull: false
    },
    phone: {
        type: DataTypes.STRING,
        unique: true,
        allowNull: false,
        
    }
}, {
    hooks: {
        beforeCreate: (user, option)=> {
            const { password } = user;
            const hash = bcrypt.hashSync(password, 10);
            user.password = hash;
        }
    }
});

module.exports = Users;