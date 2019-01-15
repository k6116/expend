const express = require('express');
const router = express.Router();
const app = express();

var controllers = require('../controllers/index.js');

// Expense Controller
router.get('/indexExpenseList', controllers.expense.indexExpenseList);
router.post('/insertExpense', controllers.expense.insertExpense);
router.post('/destroyExpense', controllers.expense.destroyExpense);

// Category Controller
router.get('/indexCategoryList', controllers.category.indexCategoryList);

// User Controller
router.get('/indexUserList', controllers.user.indexUserList);

// Auth Controller
router.post('/authenticate', controllers.auth.authenticate);
router.post('/register', controllers.auth.register);

// Python Controller
router.get('/pythonTest/', controllers.python.pythonTest);
router.get('/scheduleAlgo/', controllers.python.scheduleAlgo);


module.exports = router;

