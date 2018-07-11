
const Sequelize = require('sequelize');
const sequelize = require('../db/sequelize').sequelize;


const Model = sequelize.define('model',
  {
    modelNumber: Sequelize.STRING,
    description: Sequelize.STRING
  }
);


module.exports = Model
