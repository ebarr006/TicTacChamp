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

function Game() {
  this.available = true,
  this.id = Math.random().toString(36).substr(2, 8),
  this.p1 = null,
  this.p2 = null
}

var manager = new GameManager()

io.on('connection', function(client) {
  console.log('[ client connected ]')
  client.on('join', function(username) {
    client.join('server')
    client.username = username
    // ENFORCE NO EXISITNG USERNAMES
    console.log(`${client.username} has joined the lobby`)
    console.log(clients())
  });

  client.on('exit lobby', function() {
    console.log(`${client.username} has left the lobby`)
    // add tracking client id
  })

  client.on('joinGame', function() {
    var found = false
    var index
    // search for client in the list of games (check both player spots)
    for (i = 0; i < manager.games.length; ++i) {
      if (manager.games[i].p1 === client.username || manager.games[i].p2 === client.username) {
        found = true
        index = i
      }
    }
    // if found, dont join/create new game (just ignore the request)
    if (found) {
      console.log(`YOURE ALREADY IN GAME ${manager.games[index].id}`)
    }
    // if !found...
    else {
      // search list of games for an open spot in existing game list
      for (i = 0; i < manager.games.length; ++i) {
        // if you find one, raise flag and save index
        if (manager.games[i].p1 == null || manager.games[i].p2 == null) {
          found = true
          index = i
        }
      }
      // i can reuse found here because its inside else clause, implying its still false
      if (found) {
        console.log(`I found an existing game for you, adding you to GAME ${manager.games[index].id}`)
        // connect this client to that game (socket.join(games.[i].id))
        client.join(manager.games[index].id)
        // assign clients username to player 2 spot of said game
        manager.games[index].p2 = client.username
        // change game availablilty status to false
        // manager.games[index].available = false REMEMBER THIS
      }
      // you didnt find an open spot
      else {
        // create game
        var temp = new Game()
        temp.p1 = client.username
        manager.games.push(temp)
        console.log(`No available spots in existing matches, creating GAME ${temp.id}`)
        // ADD SOCKETLINE HERE TO JOIN GAME.ID
        client.join(temp.id)
      }
    }
  })

  client.on('leaveGame', function() {
    // find which game the client belongs to,
    // remove them from that game
    var index
    for (i = 0; i < manager.games.length; ++i) {
      if (manager.games[i].p1 === client.username) {
        manager.games[i].p1 = null
        index = i
      } else if (manager.games[i].p2 === client.username) {
        manager.games[i].p2 = null
        index = i
      }
    }
    console.log(`${client.username} has left the game.`)
    // if (both game spots (p1 & p2) are now empty (null))
    //    delete game from games list
    if (manager.games[index].p1 === null && manager.games[index].p2 === null) {
      console.log(`Deleting GAME ${manager.games[index].id} ... no more players in the room`)
      console.log(`Player1: ${manager.games[index].p1}\nPlayer2: ${manager.games[index].p2}`)
      manager.games.splice(index, 1);
    }
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
