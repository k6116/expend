
const models = require('../models')
const Sequelize = require('sequelize');
const sequelize = require('../db/sequelize').sequelize;


// sequelize.query('EXECUTE dbo.insertJobSteps :jobNumber', {replacements: {jobNumber: jobNumber}, type: sequelize.QueryTypes.SELECT})

function show(req, res) {

  // var modelNumber = req.params.modelNumber;

  // sequelize.query('EXECUTE dbo.getPickList :modelNumber', {replacements: {modelNumber: modelNumber}, type: sequelize.QueryTypes.SELECT})
  //   .then(function(results){
  //     // console.log(parts);
  //     res.json(pickListData);
  //     console.log(pickListData);
  //   })
  //   .error(function(err){
  //     console.log(err);
  //   });

}

module.exports = {
  show: show,
}
