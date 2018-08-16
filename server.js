
const express = require('express');
const bodyParser = require('body-parser');
const path = require('path');
const http = require('http');
const app = express();
const api = require('./server/routes/api');
const sequelize = require('./server/db/sequelize');

// connect to the database
sequelize.connect();

// set body parsers
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false}));

// serve static files
app.use(express.static(path.join(__dirname, 'dist')));
app.use(express.static('public'));

// send api requests to the server/routes/api.js file
app.use('/api', api);

// send all other requests to the Angular app
app.get('*', (req, res) => {
  res.sendFile(path.join(__dirname, 'dist/index.html'));
});

// set the port
const port = process.env.PORT || '4200';
app.set('port', port);

// start the server
const server = http.createServer(app);
server.listen(port, () => console.log(`Running on localhost:${port}`));
