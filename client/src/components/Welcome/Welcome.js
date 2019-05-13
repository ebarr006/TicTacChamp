import React, { Component } from 'react'
import TextField from '@material-ui/core/TextField'
import Button from '@material-ui/core/Button'

const WelcomeComponent = {
  width: '100%',
  height: '100%',
  paddingTop: '10px',
  background: '#c7a4ff',
  // background: '#bc9cf2',
  boxSizing: 'border-box',
  position: 'absolute'
}

const Header = {
  paddingTop: '220px',
  textAlign: 'center',
  fontSize: '40px',
  color: '#FFFFFF'
}

const Subtitle = {
  textAlign: 'center',
  fontSize:'20px',
  color:'#FFFFFF'
}

const TextBox = {
  textAlign: 'center'
}

const Footer = {
  paddingTop: '20px',
  textAlign: 'center',
  color:'#FFFFFF'
}

const ButtonStyle = {
  paddingTop:'10px',
  textAlign: 'center'
}


class Welcome extends Component {
  constructor(props) {
    super(props)
    this.submit = this.submit.bind(this)
    this.handleClick = this.handleClick.bind(this)
  }

  submit(event) {
    if (event.key === 'Enter') {
      this.props.action(event.target.value)
    }
  }

  handleClick(event) {
    this.props.action(event.target.value)
  }

  render () {
    const dot = <span>•</span>
    return (
      <div style={WelcomeComponent}>
        <h1 style={Header}>Tic {dot} Tac {dot} Champ</h1>
        <h3 style={Subtitle}>Challengers await</h3>
        <div style={TextBox}>
          <TextField type={'text'} label={'alias'} onKeyPress={this.submit} style={TextBox} />
        </div>
        <footer style={ButtonStyle}>
          <Button variant='outlined' color='secondary' onClick={this.handleClick}>
            Join Lobby
          </Button>
        </footer>

      </div>

    )
  }
}

export default Welcome
