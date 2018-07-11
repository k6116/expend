const express = require('express');
const router = express.Router();
const app = express();

var controllers = require('../controllers/index.js');

router.get('/indexTestData', controllers.test.indexTestData);

module.exports = router;
