var express = require('express');
var app = express();
var server = require('http').createServer(app);
var io = require('socket.io')(server);
var gameSetup = require('./GameSetup')
var port = 8080;

var games = []  // list of games in progress

app.use(express.static(__dirname + '/public'));
app.get('/', function(req, res,next) {
    res.send({express: 'CONNECTED TO REACT @ PORT 3000'});
});

// work on matchmaking next

io.on('connection', function(client) {
  console.log('[ client connected ]')
  client.on('join', function(username) {
    client.join('server')
    client.username = username
    console.log(`${client.username} has joined the lobby`)
    console.log(clients())
  });

  client.on('exit lobby', function() {
    console.log(`${client.username} has left the lobby`)
    // add tracking client id
  })

  client.on('disconnect', function(client) {
    console.log('[ client disconnected ]')
  })
})

var clients = () => {
  return Object.keys(io.sockets.adapter.rooms['server']['sockets'])
}


server.listen(port, () => {
  console.log(`TicTacChamp is listening on port ${port}`)
})
