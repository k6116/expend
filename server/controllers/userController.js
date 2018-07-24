
const models = require('../models')
const Sequelize = require('sequelize');
const sequelize = require('../db/sequelize').sequelize;

function indexUserList(req, res) {

  models.User.findAll({
    attributes: ['id', 'firstName', 'lastName', 'userName', 'password', 'email', 'lastActivityDate'],
  })
  .then(indexUserList => {
    console.log('Returning user list')
    res.json(indexUserList);
  })
  .catch(error => {
    res.status(400).json({
      title: 'Error (in catch)',
      error: {message: error}
    })

  });
}


module.exports = {
  indexUserList: indexUserList,
}
