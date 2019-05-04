function Lobby() {
  this.UserList = {}, // track users waiting on an opponent/un-paired users
  this.GameList = {}  // track active games (paired players in a game session)
}

Lobby.prototype.addUser = function(user) {
  this.UserList.push(user);
}

module.exports = Lobby;
