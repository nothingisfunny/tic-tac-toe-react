import React, {Component} from 'react';
import ReactDOM from 'react-dom';
import './index.css';


function calculateWinner(squares){
  const winCombos = [
  [0, 1, 2],
  [3, 4, 5],
  [6, 7, 8],
  [0, 3, 6],
  [1, 4, 7],
  [2, 5, 8],
  [0, 4, 8],
  [2, 4, 6]
  ]

  for (let i in winCombos){
  const [a, b, c] = winCombos[i];
    if(squares[a] && squares[a] === squares[b] && squares[a] === squares[c]){
      return squares[a]
    }
  }
}




function Square(props){
    return (
      <button className="square" onClick = {props.onClick}>
        {props.value}
      </button>
    );
}

class Board extends Component {

  renderSquare(i) {
    return <Square value={this.props.squares[i]} 
          onClick={() => this.props.onClick(i)}/>;
  }

  render() {
    
    return (
      <div>
        <div className="status">{this.props.status}</div>
        <div className="board-row">
          {this.renderSquare(0)}
          {this.renderSquare(1)}
          {this.renderSquare(2)}
        </div>
        <div className="board-row">
          {this.renderSquare(3)}
          {this.renderSquare(4)}
          {this.renderSquare(5)}
        </div>
        <div className="board-row">
          {this.renderSquare(6)}
          {this.renderSquare(7)}
          {this.renderSquare(8)}
        </div>
      </div>
    );
  }
}

class Game extends Component {

  constructor(props){
    super(props);
    this.state = {
      history: [{
        squares: Array(9).fill(null),
      }],
      xIsNext: true
    }
  }

  handleClick(i){
    var currentBoard = this.state.history[this.state.history.length - 1]
    var boardSquares = currentBoard.squares.slice();
    if (calculateWinner(boardSquares) || boardSquares[i]){
      return;
    }
    boardSquares[i] = this.state.xIsNext ? 'X' : 'O'
    this.setState({history: this.state.history.concat({squares: boardSquares}), xIsNext: !this.state.xIsNext})
  }

  render() {
    const history = this.state.history;
    const current = history[history.length - 1];
    const winner = calculateWinner(current.squares)
    let status;
    if(winner){
      status = `Winner: ${winner}`
    } else {
      status = `Next player: ${this.state.xIsNext ? "X" : "O"}`
    }

    return (
      <div className="game">
        <div className="game-board">
          <Board 
            squares = {current.squares}
            onClick ={(i) => this.handleClick(i)}
            status = {status}/>
        </div>
        <div className="game-info">
          <div>{/* status */}</div>
          <ol>{/* TODO */}</ol>
        </div>
      </div>
    );
  }
}

// ========================================

ReactDOM.render(
  <Game />,
  document.getElementById('root')
);
