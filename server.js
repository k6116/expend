
const express = require('express');
const bodyParser = require('body-parser');
const path = require('path');
const http = require('http');
const app = express();
// const api = require('./server/routes/api');

// set body parsers
// app.use(bodyParser.json());
// app.use(bodyParser.urlencoded({ extended: false}));

// serve static files
app.use(express.static(path.join(__dirname, 'dist')));
app.use(express.static('public'));

// send api requests to the server/routes/api.js file
// app.use('/api', api);

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


// const http = require('http');
// const PORT = process.env.PORT || 5000;
// const server = http.createServer((req, res) => {
//   res.statusCode = 200;
//   // res.setHeader('Content-Type', 'text/plain');
//   res.end('Hello World\n');
// });
// server.listen(PORT, () => {
//   console.log(`Server running on ${PORT}/`);
// });