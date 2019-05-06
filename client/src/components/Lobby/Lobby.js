import React, { Component } from 'react'
import Button from '@material-ui/core/Button'

// import socketIOClient from 'socket.io-client'
// var socket

class Lobby extends Component {
  constructor(props) {
    super(props)
    this.handleClick = this.handleClick.bind(this)
  }

  handleClick() {
    this.props.update('welcome')
  }

  render () {
    return (
      <div>
        <Button onClick={this.props.update('welcome')}>back</Button>
        <h1>Lobby</h1>
      </div>
    )
  }
}

export default Lobby
