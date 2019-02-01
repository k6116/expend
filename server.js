
const express = require('express');
const bodyParser = require('body-parser');
const path = require('path');
const http = require('http');
const app = express();
const api = require('./server/routes/api');
const sequelize = require('./server/db/sequelize');
const redis = require('redis');
const kue = require("kue");
const websockets = require('./server/websockets/websockets');

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

// send and receive real-time websockets messages
websockets.listen(server);

// start redis
const client = redis.createClient();

client.on("error", function (err) {
  console.log("Error " + err);
});

client.set("string key", "string val", redis.print);
client.hset("hash key", "hashtest 1", "some value", redis.print);
client.hset(["hash key", "hashtest 2", "some other value"], redis.print);
client.hkeys("hash key", function (err, replies) {
  console.log(replies.length + " replies:");
  replies.forEach(function (reply, i) {
      console.log("    " + i + ": " + reply);
  });
  client.quit();
});

// start Kue UI
kue.app.listen( 3000 );
console.log( 'UI started on port 3000' );