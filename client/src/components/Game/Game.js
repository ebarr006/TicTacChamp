import React, { Component } from 'react'
import Button from '@material-ui/core/Button'

class Game extends Component {
  constructor(props) {
    super(props)
    this.state = {
      opponent: ''
    }
    this.leaveGame = this.leaveGame.bind(this)
  }

  leaveGame() {
    this.props.action()
  }

  render () {
    return (
      <div>
      <h1>Game</h1>
        <p>You have been matched with {this.opponent}</p>
        <Button onClick={this.leaveGame}>Leave Game</Button>
      </div>
    )
  }


}

export default Game
