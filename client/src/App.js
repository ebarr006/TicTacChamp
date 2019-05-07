import React, { Component } from 'react'
import Welcome from './components/Welcome/Welcome'
import Lobby from './components/Lobby/Lobby'
import socketIOClient from 'socket.io-client'
import './App.css'

class App extends Component {
  constructor(props) {
    super(props)
    this.state = {
      page: 'welcome',
      username: '',
      endpoint: 'http://localhost:8080'
    }
    this.socket = socketIOClient(this.state.endpoint)
    this.updateClientState = this.updateClientState.bind(this)
    this.joinGame = this.joinGame.bind(this)
    this.leaveGame = this.leaveGame.bind(this)
  }

  updateClientState(newPage, signal, value) {
    console.log('UPDATE:')
    console.log(`NewPage: ${newPage}\nSignal: ${signal}\nValue: ${value}`)
    this.setState({
      page: newPage,
      username: value
    })
    this.socket.emit(signal, value)
  }

  joinGame() {
    this.socket.emit('joinGame')
  }

  leaveGame() {
    this.socket.emit('leaveGame')
  }

  renderView() {
    let state = this.state.page
    var component
    switch(state) {
      case 'welcome':
        component = <Welcome
          {...this.props}
          update={this.updateClientState}
        />
        break;

      case 'lobby':
        component = <Lobby
          {...this.props}
          update={this.updateClientState}
          join={this.joinGame}
          leave={this.leaveGame}
        />
        break;

      default:
    }
    return component
  }

  render () {
    return (
      <div>
        <p>State: {this.state.page}</p>
        <p>Alias: {this.state.username}</p>
        {this.renderView()}
      </div>
    );
  }
}
export default App;
