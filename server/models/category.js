
const Sequelize = require('sequelize');
const sequelize = require('../db/sequelize').sequelize;

const Category = sequelize.define('category',
  {
    id: { type: Sequelize.INTEGER, field: 'ID', primaryKey: true, autoIncrement: true },
    name: { type: Sequelize.STRING, field: 'Name' }
  },
  {
    schema: 'public',
    tableName: 'Category',
    timestamps: false
  }
);

module.exports = Category
