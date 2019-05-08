import React, { Component } from 'react'
import Button from '@material-ui/core/Button'

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
      <div>
        <Button onClick={this.leaveLobby}>return to login</Button>
        <h1>Lobby</h1>
        <Button onClick={this.join}>join game</Button>
      </div>
    )
  }
}

export default Lobby
