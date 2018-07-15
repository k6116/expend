
const models = require('../models')
const Sequelize = require('sequelize');
const sequelize = require('../db/sequelize').sequelize;


// sequelize.query('EXECUTE dbo.insertJobSteps :jobNumber', {replacements: {jobNumber: jobNumber}, type: sequelize.QueryTypes.SELECT})

// function indexTestData(req, res) {

//   var modelNumber = req.params.modelNumber;

//   sequelize.query('EXECUTE dbo.getPickList :modelNumber', {replacements: {modelNumber: modelNumber}, type: sequelize.QueryTypes.SELECT})
//     .then(function(results){
//       // console.log(parts);
//       res.json(pickListData);
//       console.log(pickListData);
//     })
//     .error(function(err){
//       console.log(err);
//     });

// }

// function indexTestData(req, res) {

//   models.Junk.findAll({
//     attributes: ['name', 'a_number'],
//   })
//   .then(junk => {
//     console.log('Returning Junk')
//     res.json(junk);
//   })
//   .catch(error => {
//     res.status(400).json({
//       title: 'Error (in catch)',
//       error: {message: error}
//     })

//   });
// }

// function insertTestData(req, res) {

//   const testData = req.body;

//   return sequelize.transaction((t) => {

//     return models.Junk
//       .create(
//         {
//           name: testData.name,
//           a_number: testData.a_number
//         },
//         {
//           transaction: t
//         }
//       )
//       .then(insertTestData => {

//         console.log('testData inserted');

//       })

//     }).then(() => {

//       res.json({
//         message: `testData insert has been made successfully`,
//       })

//     }).catch(error => {

//       console.log(error);
//       res.status(500).json({
//         title: 'update failed',
//         error: {message: error}
//       });

//     })
// }

module.exports = {
  // indexTestData: indexTestData,
  // insertTestData: insertTestData
}
