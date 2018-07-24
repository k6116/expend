
const models = require('../models')
const Sequelize = require('sequelize');
const sequelize = require('../db/sequelize').sequelize;


function authenticate(req, res) {

  // get the user object from the request payload/body (user name and password)
  const user = req.body;
console.log(user)
  models.User.findOne({
    where: {userName: user.userName, password: user.password}
  }).then(resUser => {
    console.log(resUser)
     res.json(resUser)
      // if (resUser) {

      //   // build an encrypted token using the jsonwebtoken module
      //   const token = jwt.sign(
      //     {
      //       userName: user.username,
      //       email: user.email, 
      //       rememberMe: true
      //     }, 
      //     tokenSecret, 
      //     {expiresIn: expirationTime}
      //   );

      //   res.json({
      //     user: resUser,
      //     token: token
      //   });

      // } else {
      //     // else return 400 bad request
      //     return Observable.throw('Username or password is incorrect');
      // }

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
