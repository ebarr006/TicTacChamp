import React, { Component } from 'react'
import Button from '@material-ui/core/Button'

const LobbyComponent = {
  width: '100%',
  height: '730px',
  paddingTop: '10px',
  background: '#c7a4ff',
}

class Lobby extends Component {
  constructor(props) {
    super(props)
    this.leaveLobby = this.leaveLobby.bind(this)
    this.join = this.join.bind(this)
  }

  leaveLobby() {
    this.props.update()
  }

  join() {
    this.props.action()
  }

  render () {
    return (
      <div style={LobbyComponent}>
        <Button onClick={this.leaveLobby} color='secondary'>return to login</Button>
        <h1>Lobby</h1>
        <Button onClick={this.join} color='secondary'>join game</Button>
      </div>
    )
  }
}

export default Lobby
