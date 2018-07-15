const express = require('express');
const router = express.Router();
const app = express();

var controllers = require('../controllers/index.js');

router.get('/indexExpenseData', controllers.expense.indexExpenseData);
router.post('/insertTestData', controllers.test.insertTestData);

module.exports = router;
