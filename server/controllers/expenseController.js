
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

function indexExpenseData(req, res) {

  models.Expense.findAll({
    attributes: ['date', 'amount', 'description', 'categoryId', 'purchasedBy', 'Shared', 'Reimbursed', 'Notes', 'CreatedBy', 'CreationDate'],
    raw: true,
    include: [
      {
        model: models.Category,
        attributes: ['name'],
      },
      {
        model: models.User,
        as: 'purchasedByUser',
        attributes: ['firstName', 'lastName'],
      }, 
      {
        model: models.User,
        as: 'createdByUser',
        attributes: ['firstName', 'lastName'],
      },  
    ]
  })
  .then(junk => {
    console.log('Returning expense data')
    res.json(junk);
  })
  .catch(error => {
    res.status(400).json({
      title: 'Error (in catch)',
      error: {message: error}
    })

  });
}

function insertTestData(req, res) {

  const testData = req.body;

  return sequelize.transaction((t) => {

    return models.Junk
      .create(
        {
          name: testData.name,
          a_number: testData.a_number
        },
        {
          transaction: t
        }
      )
      .then(insertTestData => {

        console.log('testData inserted');

      })

    }).then(() => {

      res.json({
        message: `testData insert has been made successfully`,
      })

    }).catch(error => {

      console.log(error);
      res.status(500).json({
        title: 'update failed',
        error: {message: error}
      });

    })
}

module.exports = {
  indexExpenseData: indexExpenseData,
  insertTestData: insertTestData
}
