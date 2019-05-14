import React, { Component } from 'react'
import Welcome from './components/Welcome/Welcome'
import Lobby from './components/Lobby/Lobby'
import Game from './components/Game/Game'
import MuiThemeProvider from '@material-ui/core/styles/MuiThemeProvider';
import ThemeStyle from './components/Theme/muiTheme'
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
    this.exitGame = this.exitGame.bind(this)

    this.views = {
      welcome: <Welcome {...this.props} action={this.joinLobby}/>,
      lobby: <Lobby {...this.props} update={this.exitLobby} action={this.joinGame} />,
      game: <Game {...this.props} socket={this.socket} action={this.exitGame} />
    }
  }
  // FYI setState takes a callBack

  changePage(p) {
    let prevState = this.state
    this.setState({
      ...prevState,
      page: p
    })
  }

  componentDidMount() {
    var that = this
    this.socket.on('deletingGame', function(message) {
      console.log(message)
      that.changePage('lobby')
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

  joinGame() {
    this.changePage('game')
    this.socket.emit('joinGame')
  }

  exitGame() {
    this.changePage('lobby')
    this.socket.emit('exitGame')
  }

  renderView() {
    return this.views[this.state.page]
  }

  render () {
    return (
      <MuiThemeProvider theme={ThemeStyle}>
      <div>
        {this.renderView()}
      </div>
      </MuiThemeProvider>
    );
  }
}



export default App;
