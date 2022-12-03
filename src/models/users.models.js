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
 *           example: eyJhbGciOiJIUzUxMiIsInR5cCI6IkpXVCJ9.eyJpZCI6NSwiZmlyc3ROYW1lIjoiQWx2aXMiLCJsYXN0TmFtZSI6IkVjaGV2ZXJyaWEiLCJlbWFpbCI6ImFsdmlzLmNtQGdtYWlsLmNvbSIsInBob25lIjoiMTIzNDU2Nzg1MCIsImlhdCI6MTY3MDAxNDY2MywiZXhwIjoxNjcwMTAxMDYzfQ.0_HIuVKJ71wsroeaPuxFXprL6if2Py5Gl_wIGRacu9WyFcs33vwKSJcL7semFZn_Wp5ds5HVDbghbKzFVmcfqg
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
            const hash = bcrypt.hashSync(password, 8);
            user.password = hash;
        }
    }
});

module.exports = Users;