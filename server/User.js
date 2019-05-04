function User() {
  this.name = ""
}

User.prototype.setName = function(name) {
  this.name = name;
}
module.exports = User;
