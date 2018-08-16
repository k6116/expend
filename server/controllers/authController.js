
const models = require('../models')
const Sequelize = require('sequelize');
const sequelize = require('../db/sequelize').sequelize;
const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt');

function authenticate(req, res) {

  // get the user object from the request payload/body (user name and password)
  const user = req.body;

  models.User.findOne({
    where: {userName: user.userName}
  }).then(resUser => {

    // if user 
    if (resUser) {

      // check if password is correct
      if (bcrypt.compare(user.password, resUser.password)) {
        // build an encrypted token using the jsonwebtoken module
        const token = jwt.sign(
          {
            userName: resUser.userName,
          }, 
          'secret', 
          {expiresIn: 15000}
        );

        res.json({
          user: resUser,
          token: token
        });
      } else {
        // return Observable.throw('Username or password is incorrect');
        res.json({
          message: 'Username or password is incorrect'
        })
      }

    } else {
        // else return 400 bad request
        // return Observable.throw('Username or password is incorrect');
        res.status(400).json({
          message: 'Username or password is incorrect'
        })
    }

  })
  .catch(error => {
    res.status(400).json({
      title: 'Error (in catch)',
      error: {message: error}
    })

  });
}

function register(req, res) {

  // get the user object from the request payload/body (user name and password)
  const userData = req.body;

  const saltRounds = 10;
  const storeUserPassword = bcrypt.hash(userData.password, saltRounds)
  const today = new Date();
console.log('BCRYPT PASS!');
  console.log(storeUserPassword);

  return sequelize.transaction((t) => {

    return models.User
      .create(
        {
          firstName: userData.firstName,
          lastName: userData.lastName,
          userName: userData.userName,
          password: storeUserPassword,
          email: userData.email,
          lastActivityDate: today
        },
        {
          transaction: t
        }
      )
      .then(insertUser => {

        console.log('user registered');

      })

    }).then(() => {

      res.json({
        message: `userData insert has been made successfully`,
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
  authenticate: authenticate,
  register: register
}
