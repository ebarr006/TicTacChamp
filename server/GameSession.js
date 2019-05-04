function GameSession() {
  this.player1 = 'X',
  this.player2 = 'O',
  this.spots = 2
}

GameSession.prototype.addPlayer = function(player) {
  if (this.spots === 0) return
  if (this.spots === 2) {
    this.player1 = player
  } else if (this.spots === 1) {
    this.player2 = player
  }
  --this.spots;
}

module.exports = GameSession;
