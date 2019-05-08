var express = require('express');
var app = express();
var server = require('http').createServer(app);
var io = require('socket.io')(server);
var port = 8080;

app.use(express.static(__dirname + '/public'));
app.get('/', function(req, res,next) {
    res.send({express: 'CONNECTED TO REACT @ PORT 3000'});
});

function GameManager() {
  this.games = []
}

};

function Game() {
  this.available = true,
  this.id = Math.random().toString(36).substr(2, 8),
  this.p1 = null,
  this.p2 = null
}

var manager = new GameManager()
var users = []

io.on('connection', function(client) {
  console.log(`[ ${client.id} connected ]`)
  // add newly connected client to users[] as object {id: the id, name: ''}
  users.push({id: client.id, user: ''})
  // console.log(users)

  client.on('joinLobby', function(username) {
    client.username = username
    client.join('lobby')
    console.log(`${client.username} has joined the lobby`)
  })


  client.on('exitLobby', function() {
    client.leave('lobby')
    console.log(`${client.username} has left the lobby`)
  })

  client.on('joinGame', function() {
    var found = false
    var index
    // search for client in the list of games
    for (i = 0; i < manager.games.length; ++i) {
      if (manager.games[i].p1 === client.username || manager.games[i].p2 === client.username) {
        found = true
        index = i
      }
    }
    // if found, dont join/create new game (do nothing)
    if (found) {
      // MAYBE ADD AN EMIT TO THIS SOCKET CLIENT.ID
      console.log(`YOURE ALREADY IN GAME ${manager.games[index].id}`)
    }
    // if !found...
    else {
      // search list of games for an open spot in existing game list
      for (i = 0; i < manager.games.length; ++i) {
        // if you find one, raise flag and store index
        if (manager.games[i].p1 == null || manager.games[i].p2 == null) {
          found = true
          index = i
        }
      }
      // i can reuse found here because its inside else clause, implying its still false
      if (found) {
        // EMIT NOTIFICATION TO SOCKET
        console.log(`I found an existing game for you, adding you to GAME ${manager.games[index].id}`)
        // connect this client to that game (socket.join(games.[i].id))
        client.join(manager.games[index].id)
        // assign clients username to player 2 spot of said game
        manager.games[index].p2 = client.username
        // change game availablilty status to false
        manager.games[index].available = false
      }
      // you didnt find an open spot
      else {
        // create game
        var temp = new Game()
        temp.p1 = client.username
        manager.games.push(temp)
        // EMIT NOTIFICATION TO SOCKET
        console.log(`No available spots in existing matches, creating GAME ${temp.id}`)
        // ADD SOCKETLINE HERE TO JOIN GAME.ID
        client.join(temp.id)
      }
    }
  })

  client.on('exitGame', function() {
    // find which game the client belongs to,
    // remove them from that game
    var index
    // shift remaining player p1 spot, empty out p2 slot
    for (i = 0; i < manager.games.length; ++i) {
      // client is p1 of the game, overwrite p1 with p2 (shift) and empty out p2
      if (manager.games[i].p1 === client.username) {
        manager.games[i].p1 = manager.games[i].p2
        manager.games[i].p2 = null
        index = i
      }
      // if client is p2, just empty out p2
      else if (manager.games[i].p2 === client.username) {
        manager.games[i].p2 = null
        index = i
      }
    }
    // update this game's availablilty
    manager.games[index].available = true
    console.log(`${client.username} has left the game.`)
    // if (both game spots (p1 & p2) are now empty (null))
    //    delete game from games list
    if (manager.games[index].p1 === null && manager.games[index].p2 === null) {
      console.log(`Deleting GAME ${manager.games[index].id} ... no more players in the game`)
      console.log(`Player1: ${manager.games[index].p1}\nPlayer2: ${manager.games[index].p2}`)
      manager.games.splice(index, 1);
    }
  })

  client.on('disconnect', function(client) {
    console.log('[ client disconnected ]')
    // REMOVE USER FROM USERS[] by client.id

    // need a way detect this from other player and remove them from game

  })
})

function nameTaken(name, id) {
  console.log(`using: ${name} and id: ${id}`)
  console.log('All: ' + Object.keys(io.sockets.adapter.rooms))
  for (var i in users) {
    if (users[i]['user'] === name) {
      console.log(`${users[i]['user']} already in use`)
      return true
    }
  }

  for (var i in users) {
    if (users[i]['id'] === id) {
      users[i]['user'] = name
    }
  }

  return false
}

server.listen(port, () => {
  console.log(`TicTacChamp is listening on port ${port}`)
})
