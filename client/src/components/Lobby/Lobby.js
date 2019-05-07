import React, { Component } from 'react'
import Button from '@material-ui/core/Button'

class Lobby extends Component {
  constructor(props) {
    super(props)
    this.backHandler = this.backHandler.bind(this)
    this.joinHandler = this.joinHandler.bind(this)
    this.leaveHandler = this.leaveHandler.bind(this)
  }

  backHandler() {
    this.props.update('welcome', 'exit lobby', '')
  }

  joinHandler() {
    this.props.join()
  }

  leaveHandler() {
    this.props.leave()
  }

  render () {
    return (
      <div>
        <Button onClick={this.backHandler}>back</Button>
        <h1>Lobby</h1>
        <Button onClick={this.joinHandler}>Join Game</Button>
        <Button onClick={this.leaveHandler}>Leave Game</Button>
      </div>
    )
  }
}

export default Lobby
