
const models = require('../models')
const Sequelize = require('sequelize');
const sequelize = require('../db/sequelize').sequelize;


function indexCategoryList(req, res) {

  models.Category.findAll({
    attributes: ['id', 'name'],
  })
  .then(indexCategoryList => {
    console.log('Returning category list')
    res.json(indexCategoryList);
  })
  .catch(error => {
    res.status(400).json({
      title: 'Error (in catch)',
      error: {message: error}
    })

  });
}



module.exports = {
  indexCategoryList: indexCategoryList
}
