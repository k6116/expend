
const models = require('../models')
const Sequelize = require('sequelize');
const sequelize = require('../db/sequelize').sequelize;
const kue = require("kue");
const jobs = kue.createQueue();


function kueVideo(req, res) {

  const obj = req.body;

  const job  = jobs.create( 'video conversion', {
    title: 'converting ' + obj.name + '\'s to avi', user: 1, frames: 200
  } );

  job.on( 'complete', function () {
    console.log( " Job complete" );
  } ).on( 'failed', function () {
    console.log( " Job failed" );
  } ).on( 'progress', function ( progress ) {
    console.log( '\r  job #' + job.id + ' ' + progress + '% complete' );
  } );

  job.save();
};

function kueEmail(req, res) {

  const obj = req.body;

  jobs.create( 'email', {
    title: 'Emailing ' + obj.name + '', body: 'hello'
  } ).save();

};


// process 10 emails at a time

jobs.process( 'email', 10, function ( job, done ) {
  console.log( 'email' );
  setTimeout( done, 5000 );
} );

jobs.process( 'video conversion', 1, function ( job, done ) {

  const frames = job.data.frames;

  function next( i ) {
    // pretend we are doing some work
    convertFrame( i, function ( err ) {
      if ( err ) return done( err );
      // report progress, i/frames complete or ( completed, total )
      job.progress( i, frames );
      if ( i >= frames ) done()
      else next( i + Math.random() * 10 );
    } );
  }

  next( 0 );
} );

function convertFrame( i, fn ) {
  setTimeout( fn, Math.random() * 500 );
}


module.exports = {
  kueVideo: kueVideo,
  kueEmail: kueEmail
}
