import React, { Component } from 'react'
import Button from '@material-ui/core/Button'

class Lobby extends Component {
  constructor(props) {
    super(props)
    this.handler = this.handler.bind(this)
  }

  handler() {
    this.props.update('welcome', 'exit lobby', '')
  }

  render () {
    return (
      <div>
        <Button onClick={this.handler}>back</Button>
        <h1>Lobby</h1>
      </div>
    )
  }
}

export default Lobby
