const express = require('express')
const http = require('http')
const socketio = require('socket.io')
var Game = require('./GameSession')
var Lobby = require('./Lobby')
var User = require('./User')


var p1 = new User()
var p2 = new User()

p1.setName('emilio')
p2.setName('alex')

// test user/game/lobby when i get back

console.log(p1.name)
console.log(p2.name)

var x = new Game()
console.log(x.player1)
console.log(x.player2)
console.log(x.spots)



// const port = 4001
// const app = express()
// const server = http.createServer(app)
// const io = socketio(server)
//
// io.on('connection', socket => {
//   console.log('user connected')
//
//   socket.on('change color', (color) => {
//     console.log('Color changed to: ', color)
//     io.sockets.emit('change color', color)
//   })
//
//   socket.on('disconnect', () => {
//     console.log('user disconnected')
//   })
//
// })
//
// server.listen(port, () => console.log(`tic tac patty wack online / port ${port}`))
