

var Sequelize = require('sequelize')

const config = require('./config').config;

const sequelize = new Sequelize(config.dbname, config.username, config.password, {
  host: config.host,
  dialect: config.dialect
});

function connect() {

  sequelize
    .authenticate()
    .then(() => {
      console.log(`Postgres connection to database '${sequelize.config.database}' has been established successfully`);
    })
    .catch(err => {
      console.error('Unable to connect to the database:', err);
    });

}
module.exports = {
  sequelize: sequelize,
  connect: connect
};
