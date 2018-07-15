
const Sequelize = require('sequelize');
const sequelize = require('../db/sequelize').sequelize;

const User = sequelize.define('user',
  {
    id: { type: Sequelize.INTEGER, field: 'ID', primaryKey: true, autoIncrement: true },
    firstName: { type: Sequelize.STRING, field: 'FirstName' },
    lastName: { type: Sequelize.STRING, field: 'LastName' },
    email: { type: Sequelize.STRING, field: 'Email' },
    lastActivityDate: { type: Sequelize.STRING, field: 'LastActivityDate' }
  },
  {
    schema: 'public',
    tableName: 'User',
    timestamps: false
  }
);

module.exports = User
