var express = require('express');
var app = express();
var server = require('http').createServer(app);
var io = require('socket.io')(server);
var port = 8080;

app.use(express.static(__dirname + '/public'));
app.get('/', function(req, res,next) {
    res.send({express: 'CONNECTED TO REACT @ PORT 3000'});
});

function User(id) {
  this.id = id,
  this.name = ''
}

function Game() {
  this.id = Math.random().toString(36).substr(2, 8),
  this.available = true,
  this.p1 = null,
  this.p2 = null
}

var UserList = []
var GameList = []

function updateName(id, name) {
  for (var i = 0; i < UserList.length; ++i) {
    if (UserList[i].id === id) {
      UserList[i].name = name
    }
  }
}

function returnPlayerObject(name) {
  for (var i = 0; i < UserList.length; ++i) {
    if (UserList[i].name === name) {
      return UserList[i]
    }
  }
}

function returnGameObject(id) {
  for (var i = 0; i < GameList.length; ++i) {
    if (GameList[i].id === id) {
      return GameList[i]
    }
  }
}


io.on('connection', function(client) {
  console.log(`[ ${client.id} connected ]`)
  console.log('All: ' + Object.keys(io.sockets.adapter.rooms))
  var temp = new User(client.id)
  UserList.push(temp)

  client.on('joinLobby', function(username) {
    client.join('asdfasdfasd')
    client.username = username
    updateName(client.id, username)
    console.log(`${username} has joined the lobby`)
    console.log(UserList)
  })

  client.on('exitLobby', function() {
    client.leave('lobby')
    console.log(`${client.username} has left the lobby`)
  })

  client.on('joinGame', function() {
    // search list of games for an open spot in existing game list
    for (var i = 0; i < GameList.length; ++i) {
      // if you find one, raise flag and store index
      if (GameList[i].available) {
        // EMIT NOTIFICATION TO SOCKET
        console.log(`I found an existing game for you, adding you to GAME ${GameList[i].id}`)
        GameList[i].p2 = returnPlayerObject(client.username)
        GameList[i].available = false
        client.join(GameList[i].id)
        console.log(GameList[i])
        return
      }
    }
    // EMIT NOTIFICATION TO SOCKET
    var temp = new Game()
    temp.p1 = returnPlayerObject(client.username)
    client.join(temp.id)
    GameList.push(temp)
    console.log(`No available spots in existing matches, creating GAME ${temp.id}`)
    console.log(temp)
  })

  client.on('exitGame', function() {
    for (var i = 0; i < GameList.length; ++i) {
      var game = GameList[i]
      if (client.username === game.p1.name || client.username === game.p2.name) {
        var id = game.id
        console.log('deleting GAME: ' + id)
        GameList.splice(i, 1)
        if (client.username === game.p1.name) {
          client.leave(id)
          console.log(`I'm ${game.p1.name} emitting GAME ${id} to ${game.p2.name}`)
          io.to(game.p2.id).emit('deletingGame', 'Your opponent has quit the match, returning you to lobby')
        }
        else if (typeof(game.p2.name) !== 'undefined' && client.username === game.p2.name) {
          client.leave(id)
          console.log(`I'm ${game.p2.name} emitting GAME ${id} to ${game.p1.name}`)
          io.to(game.p1.id).emit('deletingGame', 'Your opponent has quit the match, returning you to lobby')
        }
      }
    }
  })

  client.on('deletingGame', function(id) {
    console.log(`I'm ${client.username} receiving deletingGame`)
    client.leave(id)
  })

  client.on('disconnect', function(client) {
    console.log('[ client disconnected ]')
  })
})

server.listen(port, () => {
  console.log(`TicTacChamp is listening on port ${port}`)
})
