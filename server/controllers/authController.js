
const models = require('../models')
const Sequelize = require('sequelize');
const sequelize = require('../db/sequelize').sequelize;
const jwt = require('jsonwebtoken');

function authenticate(req, res) {

  // get the user object from the request payload/body (user name and password)
  const user = req.body;
console.log(user)
  models.User.findOne({
    where: {userName: user.userName, password: user.password}
  }).then(resUser => {

    if (resUser) {
      console.log('testing!');
// res.json(resUser);
      // build an encrypted token using the jsonwebtoken module
      const token = jwt.sign(
        {
          userName: resUser.userName,
        }, 
        'secret', 
        {expiresIn: 15000}
      );

console.log('toekn', token)
      res.json({
        user: resUser,
        token: token
      });

    } else {
        // else return 400 bad request
        return Observable.throw('Username or password is incorrect');
    }

  })
  .catch(error => {
    res.status(400).json({
      title: 'Error (in catch)',
      error: {message: error}
    })

  });
}



module.exports = {
  authenticate: authenticate
}
