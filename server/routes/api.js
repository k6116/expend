const express = require('express');
const router = express.Router();
const app = express();

var controllers = require('../controllers/index.js');


// router.get('/pickList/:modelNumber', controllers.pickLists.show);
// router.get('/pickList2/:modelNumber', controllers.pickLists.show2);
// router.get('/pickList3/:modelNumber', controllers.pickLists.show3);
// router.post('/pickList', controllers.pickLists.insert);

module.exports = router;
