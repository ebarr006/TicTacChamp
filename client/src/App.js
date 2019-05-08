import React, { Component } from 'react'
import Welcome from './components/Welcome/Welcome'
import Lobby from './components/Lobby/Lobby'
import Game from './components/Game/Game'
import socketIOClient from 'socket.io-client'
import './App.css'

class App extends Component {
  constructor(props) {
    super(props)
    this.state = {
      page: 'welcome',
      user: ''
    }

    this.socket = socketIOClient('http://localhost:8080')
    this.changePage = this.changePage.bind(this)
    this.joinLobby = this.joinLobby.bind(this)
    this.exitLobby = this.exitLobby.bind(this)
    this.joinGame = this.joinGame.bind(this)
    this.leaveGame = this.leaveGame.bind(this)
    this.validate = this.validate.bind(this)

    this.views = {
      welcome: <Welcome {...this.props} action={this.joinLobby}/>,
      lobby: <Lobby {...this.props} update={this.exitLobby} action={this.joinGame} />,
      game: <Game {...this.props} action={this.leaveGame} />
    }
  }
  // FYI setState takes a callBack

  validate(name) {
    var res
    console.log('2. in validate: ' + new Date().getMinutes() + ':' + new Date().getSeconds())
    console.log('3. above .emit() | ' + new Date().getMinutes() + ':' + new Date().getSeconds())
    this.socket.emit('validate', name, function(found) {
      console.log('start emitting to server: ' + found)
      res = found
      console.log('5. finish emit: ' + new Date().getMinutes() + ':' + new Date().getSeconds())
    })
    console.log('6. outside emit, about to leave validate ' + new Date().getMinutes() + ':' + new Date().getSeconds())
    return res
  }


  changePage(p) {
    let prevState = this.state
    this.setState({
      ...prevState,
      page: p
    })
  }

  joinLobby(name) {
    this.setState({
      page: 'lobby',
      user: name
    })
    this.socket.emit('joinLobby',name)
  }

  exitLobby() {
    this.setState({
      page: 'welcome',
      user: ''  // discard username
    })
    this.socket.emit('exitLobby', '')
  }

  joinGame(name) {
    this.changePage('game')
    this.socket.emit('joinGame')
  }

  leaveGame() {
    this.changePage('lobby')
    this.socket.emit('exitGame')
  }

  renderView() {
    return this.views[this.state.page]
  }

  render () {
    return (
      <div>
        <p>State: {this.state.page}</p>
        <p>Alias: {this.state.user}</p>
        {this.renderView()}
      </div>
    );
  }
}
export default App;
