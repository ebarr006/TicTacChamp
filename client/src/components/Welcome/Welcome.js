import React, { Component } from 'react'
import TextField from '@material-ui/core/TextField'

class Welcome extends Component {
  constructor(props) {
    super(props)
    this.submit = this.submit.bind(this)
  }

  submit(event) {
    if (event.key === 'Enter') {
      this.props.action(event.target.value)
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
          onKeyPress={this.submit}
        />
      </div>
    )
  }
}

export default Welcome
