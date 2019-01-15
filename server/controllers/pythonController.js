
const models = require('../models')
const Sequelize = require('sequelize');
const sequelize = require('../db/sequelize').sequelize;


function pythonTest(req, res) {

  
  // let spawn = require("child_process").spawn;

  // let process = spawn('python',["./src/assets/python/hello.py",
  //                         req.params.firstName,
  //                         req.params.lastName] );
  // // Takes stdout data from script which executed
  // // with arguments and send this data to res object
  // process.stdout.on('data', function(data) {
  //   res.send(data.toString());
  // })


  const spawn = require("child_process").spawn;
  const py = spawn('python', ["./src/assets/python/testString.py"]);
  var dataString = '';

  // Handle normal output
  py.stdout.on('data', (data) => {
    dataString += data.toString();
  });

  py.stdout.on('end', () => {
    console.log('datastring', dataString)
    // console.log(dataString.replace(/(?:\\[rn])+/g, 'wrt'));
    res.json(dataString.replace(/(?:\\[rn])+/g, ""));
  });

  // Write data (remember to send only strings or numbers, otherwhise python wont understand)
  // var data = JSON.stringify([1,2,3,4,6,125]);
  var data = JSON.stringify(['paul','ant', 'tojo']);
  py.stdin.write(data);
  
  // End data write
  py.stdin.end();


};


function scheduleAlgo(req, res) {

  let spawn = require("child_process").spawn;

  let py = spawn('python',["./src/assets/python/marko_weeks.py"] );
  dataString = '';

  // Takes stdout data from script which executed
  // with arguments and send this data to res object
  py.stdout.on('data', function(data) {
    dataString += data.toString();      
  })
  py.stdout.on('end', function(){
    console.log('Sum of numbers=', dataString);
    res.json(dataString.toString());
  });
  // py.stdin.write(JSON.stringify(dataString));
  // py.stdin.write(res.json(dataString.toString()));
  py.stdin.end();
};


module.exports = {
  pythonTest: pythonTest,
  scheduleAlgo: scheduleAlgo
}
