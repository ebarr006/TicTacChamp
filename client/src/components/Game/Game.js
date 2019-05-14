import React from 'react'
import Modal from '@material-ui/core/Modal';
import Dialog from '@material-ui/core/Dialog';
import './Game.css'

function Tile(props) {
  return (
    <div className="tile" onClick={props.onClick}>
      {props.value}
    </div>
  );
}

class Board extends React.Component {
  renderTile(i) {
    return (
      <Tile
        value={this.props.tiles[i]}
        onClick={() => this.props.onClick(i)}
      />
    );
  }

  render() {
    return (
      <div className="ticTacToe">
        <div className="column">
          {this.renderTile(0)}
          {this.renderTile(1)}
          {this.renderTile(2)}
        </div>
        <div className="column">
          {this.renderTile(3)}
          {this.renderTile(4)}
          {this.renderTile(5)}
        </div>
        <div className="column">
          {this.renderTile(6)}
          {this.renderTile(7)}
          {this.renderTile(8)}
        </div>
      </div>
    );
  }
}

class Game extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      tiles: Array(9).fill(null),
      xIsNext: true
    };
    // this.socket = socketIOClient('http://localhost:8080')
    this.opponent = null;
  }

  componentDidMount() {
    var that = this
    this.props.socket.on('oppInfo', function(opp) {
      console.log('from opponent: ' + opp.id)
      let prevState = that.state
      that.setState({
        ...prevState,
        opponent: opp
      })
    })
    this.props.socket.on('oppTurn', function(data) {
      console.log('data: ' + data)
      that.handleClick(data)
    })
  }

  handleClick(i) {
    const tiles = this.state.tiles
    if (calculateWinner(tiles) || tiles[i]) {
      return;
    }
    this.props.socket.emit('turn', {
      tile: i,
      to: this.state.opponent.id
    })
    tiles[i] = this.state.xIsNext ? 'X' : 'O';
    this.setState({
      tiles: tiles,
      xIsNext: !this.state.xIsNext,
    });
  }

  render() {
    const winner = calculateWinner(this.state.tiles);
    let status;
    if (winner) {
      status = 'Winner: ' + winner;
    } else {
      status = 'Next player: ' + (this.state.xIsNext ? 'X' : 'O');
    }

    return (
      <div className="window">
        <div className="header">
          {status}
        </div>
        <div className="contentContainer">
          <div className="innerContainer">
            <Board
              tiles={this.state.tiles}
              onClick={(i) => this.handleClick(i)}
            />
          </div>
          <div className="innerContainer">
            <div className="chatWindow">
              <div className="chatHeader">
                <h3 className="chatH3">Game Chat</h3>
              </div>
              <div className="chatBody">
                <p className="chatText">this is where text will display</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

function calculateWinner(tiles) {
  const lines = [
    [0, 1, 2],
    [3, 4, 5],
    [6, 7, 8],
    [0, 3, 6],
    [1, 4, 7],
    [2, 5, 8],
    [0, 4, 8],
    [2, 4, 6],
  ];
  for (let i = 0; i < lines.length; i++) {
    const [a, b, c] = lines[i];
    if (tiles[a] && tiles[a] === tiles[b] && tiles[a] === tiles[c]) {
      return tiles[a];
    }
  }
  return null;
}

export default Game
