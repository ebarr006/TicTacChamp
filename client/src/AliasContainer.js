import React, { Component } from 'react'
import TextField from '@material-ui/core/TextField'
import classNames from 'classnames'
import socketIOClient from 'socket.io-client'

var socket

class AliasContainer extends Component {
  constructor(props) {
    super(props)
    this.state = {
      endpoint: 'http://localhost:8080',
      username: ''
    }
    socket = socketIOClient(this.state.endpoint)
    this.handleChange = this.handleChange.bind(this)
    // this.handleSubmit = this.handleSubmit.bind(this)
  }

  handleChange(event) {
    if (event.key === 'Enter') {
      // event.preventDefault()
      socket.emit('join', event.target.value)
      return
    }
    this.setState({ username : event.target.value})

  }

  render () {
    const {username} = this.state
    return (
      <div>
        <h1>TicTacChamp</h1>
        <h3>Challengers await you.. Declare yourself</h3>
        <TextField
          type={'text'}
          label={'alias'}
          onKeyPress={this.handleChange}
        />
      </div>
    )
  }
}

export default AliasContainer
