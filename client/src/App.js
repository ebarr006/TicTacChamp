import React, { Component } from 'react'
import Welcome from './components/Welcome/Welcome'
import Lobby from './components/Lobby/Lobby'
import './App.css'

class App extends Component {
  constructor(props) {
    super(props)
    this.state = {
      page: 'welcome',
      status: 'init'
    }
  }

  update(name) {
    this.setState({ page: name })
  }

  renderView() {
    let state = this.state.page
    var component
    switch(state) {
      case 'welcome':
        component = <Welcome {...this.props} update={this.update.bind(this)} />
        break;

      case 'lobby':
        component = <Lobby {...this.props} update={this.update.bind(this)} />
        break;

      default:
    }
    return component
  }

  render () {
    return (
      <div>
        <p>State : {this.state.page}</p>
        <p>Status: {this.state.status}</p>
        {this.renderView()}
      </div>
    );
  }
}
export default App;
