
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

function indexExpenseList(req, res) {

  models.Expense.findAll({
    attributes: ['date', 'amount', 'description', 'categoryId', 'purchasedBy', 'shared', 'reimbursed', 'notes', 'createdBy', 'creationDate'],
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
  .then(indexExpenseList => {
    console.log('Returning expense list')
    res.json(indexExpenseList);
  })
  .catch(error => {
    res.status(400).json({
      title: 'Error (in catch)',
      error: {message: error}
    })

  });
}

function insertExpense(req, res) {

  const expenseData = req.body;
  const today = new Date();

  return sequelize.transaction((t) => {

    return models.Expense
      .create(
        {
          date: expenseData.date,
          amount: expenseData.amount,
          description: expenseData.description,
          categoryId: expenseData.categoryId,
          purchasedBy: expenseData.purchasedBy,
          shared: expenseData.shared,
          reimbursed: expenseData.reimbursed,
          notes: expenseData.notes,
          createdBy: 1,
          creationDate: today
        },
        {
          transaction: t
        }
      )
      .then(insertExpenseData => {

        console.log('expenseData inserted');

      })

    }).then(() => {

      res.json({
        message: `expenseData insert has been made successfully`,
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
  indexExpenseList: indexExpenseList,
  insertExpense: insertExpense
}
