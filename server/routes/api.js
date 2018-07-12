const express = require('express');
const router = express.Router();
const app = express();

var controllers = require('../controllers/index.js');

router.get('/indexTestData', controllers.test.indexTestData);
router.post('/insertTestData', controllers.test.insertTestData);

module.exports = router;
