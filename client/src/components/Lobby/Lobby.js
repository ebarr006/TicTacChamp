import React, { Component } from 'react'
import Button from '@material-ui/core/Button'
import Divider from '@material-ui/core/Divider';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListSubheader from '@material-ui/core/ListSubheader';
import BuildIcon from '@material-ui/icons/Build';
import HttpIcon from '@material-ui/icons/Http';
import CodeIcon from '@material-ui/icons/Code';
import RouterIcon from '@material-ui/icons/Router';
import StyleIcon from '@material-ui/icons/Style';
import CategoryIcon from '@material-ui/icons/Category';
import Paper from '@material-ui/core/Paper'

import './Lobby.css'

class Lobby extends Component {
  constructor(props) {
    super(props)
    this.leaveLobby = this.leaveLobby.bind(this)
    this.join = this.join.bind(this)
  }

  leaveLobby() {
    this.props.update()
  }

  join() {
    this.props.action()
  }


  render () {
    return (
      <div className="window">
        <div className="header">
            <b>Tech Stack</b>
        </div>
          <div className="container">
            <Paper className="paper" elevation={8}>
              <List subheader={<ListSubheader component="div">Backend</ListSubheader>}>
                <ListItem>
                  <ListItemIcon>
                    <BuildIcon />
                  </ListItemIcon>
                  NodeJS
                </ListItem>
                <Divider />
                <ListItem>
                  <ListItemIcon>
                    <HttpIcon />
                  </ListItemIcon>
                  ExpressJS
                </ListItem>
                <Divider />
                <ListItem>
                  <ListItemIcon>
                    <RouterIcon />
                  </ListItemIcon>
                  Socket.io
                </ListItem>
              </List>
            </Paper>
            <Paper className="paper" elevation={8}>
            <List subheader={<ListSubheader component="div">Frontend</ListSubheader>}>
              <ListItem>
                <ListItemIcon>
                  <CategoryIcon />
                </ListItemIcon>
                React
              </ListItem>
            </List>
            </Paper>
            <Paper className="paper" elevation={8}>
            <List subheader={<ListSubheader component="div">Styling</ListSubheader>}>
              <ListItem>
                <ListItemIcon>
                  <CodeIcon />
                </ListItemIcon>
                HTML
              </ListItem>
              <Divider />
              <ListItem>
                <ListItemIcon>
                  <StyleIcon />
                </ListItemIcon>
                CSS
              </ListItem>
            </List>
            </Paper>
          </div>
          <div className="buttonBox">
            <Button onClick={this.leaveLobby} color='secondary'><b>return to login</b></Button>
            <Button onClick={this.join} color='secondary'><b>join game</b></Button>
          </div>
      </div>

    )
  }
}

// <div className="window">
//   <div style={LobbyComponent}>
//     <Button onClick={this.leaveLobby} color='secondary'>return to login</Button>
//     <h1>Lobby</h1>
//     <Button onClick={this.join} color='secondary'>join game</Button>
//   </div>
// </div>

export default Lobby
