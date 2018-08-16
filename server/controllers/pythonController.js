
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

  let spawn = require('child_process').spawn;
  let py = spawn('python',["./src/assets/python/hello.py"] );
  let data = [1,2,3,4,5,6,7,8,9];
  let dataString = '';
  let awef = '';

  py.stdout.on('data', function(data){
    dataString += data.toString();
  });
  py.stdout.on('end', function(){
    console.log('Sum of numbers=', dataString);

  });
  py.stdin.write(JSON.stringify(data));
  this.awef = data
  res.json(JSON.stringify(this.awef))
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
