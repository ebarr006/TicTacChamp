import React, { Component } from 'react'
import socketIOClient from 'socket.io-client'

var socket
class Login extends Component {
  constructor(props) {
    super(props)
    this.state = {
      endpoint: 'http://localhost:8080',
      username: null
    }
    socket = socketIOClient(this.state.endpoint)
  }

  // componentDidMount() {
  //   const { endpoint } = this.state
  //   const socket = socketIOClient(endpoint)
  //   socket.emit('connection')
  // }

  handleSubmit = (event) => {
    event.preventDefault()
    const data = this.state
    console.log(data)
    socket.emit('join', data)
  }

  handleInputChange = (event) => {
    event.preventDefault()
    this.setState({
      [event.target.name]: event.target.value
    })
  }

  render () {
    const {username} = this.state
    return (
      <div>
        <h1>TicTacChamp</h1>
        <h3>your opponents await.. enter a name to get started</h3>
        <p>username is: {username}</p>
        <form onSubmit={this.handleSubmit}>
          <p><input type='text' placeholder='username' name='username' onChange={this.handleInputChange} /></p>
          <p><button>Blastoff</button></p>
        </form>
      </div>
    )
  }
}

export default Login
