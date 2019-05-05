var express = require('express');
var app = express();
var server = require('http').createServer(app);
var io = require('socket.io')(server);
var gameSetup = require('./GameSetup')
var port = 8080;

var games = []  // list of games in progress
var playerCount = 0

app.use(express.static(__dirname + '/public'));
app.get('/', function(req, res,next) {
    res.send({express: 'BACKEND CONNECTED TO REACT'});
});

// work on matchmaking next

io.on('connection', function(client) {
  console.log('[ client connected ]')
  client.join('lobby')
  if (clients().length) playerCount = clients.length
  io.emit('playerUpdate', playerCount)
  client.on('join', function(username) {
    client.username = username
    console.log(`username: ${client.username}`)
    io.emit('playerUpdate', playerCount++)
    console.log(clients())

  });

  client.on('disconnect', function(client) {
    console.log('[ client disconnected ]')
    try {
      if (clients().length) {
        io.emit('playerUpdate', clients().length)
        console.log(clients())
      } else {
        console.log('Lobby is now empty')
      }
    } catch(err) {}
  })
})

var clients = () => {
  return Object.keys(io.sockets.adapter.rooms['lobby']['sockets'])
}


server.listen(port, () => {
  console.log(`TicTacChamp is listening on port ${port}`)
})
