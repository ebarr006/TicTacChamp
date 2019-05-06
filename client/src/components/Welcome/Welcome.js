import React, { Component } from 'react'
import TextField from '@material-ui/core/TextField'

class Welcome extends Component {
  constructor(props) {
    super(props)
    this.handler = this.handler.bind(this)
  }

  handler(event) {
    if (event.key === 'Enter') {
      this.props.update('lobby', 'join', event.target.value)
      return
    }
  }

  render () {
    return (
      <div>
        <h1>TicTacChamp</h1>
        <h3>Challengers await you.. Declare yourself</h3>
        <TextField
          type={'text'}
          label={'alias'}
          onKeyPress={this.handler}
        />
      </div>
    )
  }
}

export default Welcome
