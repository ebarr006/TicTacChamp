import React, { Component } from 'react';
import socketIOClient from 'socket.io-client';

class App extends Component {
  constructor() {
    super();
    // store the endpoint in the state to be referenced by app
    this.state = {
      endpoint: "localhost:4001",
      color: 'grey'
    };
  }

  send = () => {
    const socket = socketIOClient(this.state.endpoint);
    // tells socket to emit 'change color' signal, passing along this.state.color
    socket.emit('change color', this.state.color)
  }

  // function to execute change color
  setColor = (color) => {
    this.setState({color})
  }

  render() {
    const socket = socketIOClient(this.state.endpoint);
    socket.on('change color', (col) => {
      document.body.style.backgroundColor = col
    })
    return (
      <div style={{textAlign: "center"}}>
        <button onClick={() => this.send() }>Change Color </button>
        <button id="blue" onClick={() => this.setColor('blue')}>Blue</button>
        <button id="red" onClick={() => this.setColor('red')}>Red</button>
        <p> knick knack patty wack blast off testing </p>
      </div>
    )
  }
}

export default App;
