
const Sequelize = require('sequelize');
const sequelize = require('../db/sequelize').sequelize;

const Junk = sequelize.define('junk',
  {
    name: { type: Sequelize.STRING, field: 'name'},
    a_number: { type: Sequelize.INTEGER, field: 'a_number' }
  },
  {
    schema: 'public',
    tableName: 'junk',
    timestamps: false
  }
);


module.exports = Junk
