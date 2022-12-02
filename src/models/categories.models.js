const db = require('../utils/database');
const { DataTypes } = require('sequelize');

const Categories = db.define("categories", {
    id: {
      primaryKey: true,
      autoIncrement: true,
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    name: {
      type: DataTypes.STRING,
      unique: true,
      allowNull: false,
    },
    status: {
        type: DataTypes.ENUM('active', 'inactive'),
        defaultValue: 'active'
    }
  },
  {
    timestamps: false
  }
);

module.exports = Categories;