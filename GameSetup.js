// shift to remove top/ pop to remove bottom/ push to add to bottom

function Game(p1, p2) {
  this.player1 = p1,
  this.player1.char = 'X',
  this.player2 = p2,
  this.player2.char = 'O'
}


function Player(name) {
  this.name = name
  this.char = ""
}

module.exports = {
  Game:Game,
  Player:Player
};
