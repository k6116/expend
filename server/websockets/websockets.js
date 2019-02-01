

function listen(server) {

  const io = require('socket.io')(server);

  io.on('connection', socket => {
    console.log('a user connected');
    socket.on('message', message => {
      io.emit('message', message);
    });
    socket.on('loggedInUser', loggedInUser => {
      io.emit('loggedInUser', loggedInUser);
    });
    socket.on('loggedOutUser', loggedOutUser => {
      io.emit('loggedOutUser', loggedOutUser);
    });
    socket.on('project', project => {
      io.emit('project', project);
    });
    socket.on('disconnect', () => {
      console.log('a user disconnected');
    });
  });

}



module.exports = {
  listen: listen
}