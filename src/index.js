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
      return [a, b, c]
    }
  }
}


function Square(props){
    return (
      <button className="square" onClick = {props.onClick} style={{backgroundColor: props.color}}>
        {props.value}
      </button>
    );
}

class Board extends Component {

  renderSquare(i) {
    return <Square value={this.props.squares[i]} 
          onClick={() => this.props.onClick(i)}
          color = {
            this.props.winnerCombo && this.props.winnerCombo.indexOf(i) > -1 ? "yellow" : null
          }
          />;
  }
  render() {
  let rows = Array(3).fill(null)
  let board = rows.map((i, row)=>{
    return <div className="board-row" key={row}>
    {
      Array(3).fill(null).map((j, column)=>{
        return <span key = {row*3 + column}>{this.renderSquare(row*3 + column)}</span>
      })
    }
    </div>
  })
  

   return (
      <div>
       {board}
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
      moves: [],
      stepNumber: 0, 
      xIsNext: true,
      sortDesc: false
    }
  }

  handleClick(i){
    const current = this.state.history[this.state.history.length - 1]
    const squares = current.squares.slice();
    const moves = this.state.moves.slice()
    moves.push([i%3+1, Math.ceil((i+1)/3)])
    if (calculateWinner(squares) || squares[i]){
      return;
    }
    squares[i] = this.state.xIsNext ? 'X' : 'O'
    this.setState({history: this.state.history.concat({squares: squares}), 
      moves: moves,
      xIsNext: !this.state.xIsNext,
      stepNumber: this.state.history.length,
      
    })
  }

  jumpTo(step){
    this.setState({
      stepNumber: step,
      xIsNext: (step % 2) === 0
    })
  }

  render() {
    
    const history = this.state.history;
    const current = history[this.state.stepNumber];
    const winnerCombo = calculateWinner(current.squares)
  
    const winner = winnerCombo ? current.squares[winnerCombo[0]] : null

    const coord = this.state.sortDesc ? this.state.moves.reverse() : this.state.moves
    const moves = history.map((step, move) => {

      let currentMove = this.state.sortDesc ? history.length - move : move

      
      const desc = move ?
      'Go to move #' + currentMove + " " + coord[move - 1] : 'Go to game start';
      return (
      <li key = {move} >
        <button style = {{fontWeight: move === this.state.stepNumber ? 'bold' : 'normal'}} onClick = {() => this.jumpTo(move)}>{desc}</button>
      </li>
    )
    })


    let status;
    
    if(winner){
      status = `Winner: ${winner}`
    } else if(!winner && current.squares.every((i)=> i!== null )){
      status = "Draw"
    }else {
      status = `Next player: ${this.state.xIsNext ? "X" : "O"}`
    }

    return (
      <div className="game">
        <div className="game-board">
          <Board 
            winnerCombo = {winnerCombo}
            squares = {current.squares}
            onClick ={(i) => this.handleClick(i)}
            />
        </div>
        <div className="game-info">
          <div>{status}</div>
          <ul>{moves}</ul>
          <button onClick={() => this.setState({sortDesc: !this.state.sortDesc})}>Sort {this.state.sortDesc ? 'ASC' : 'DESC'}</button>
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
