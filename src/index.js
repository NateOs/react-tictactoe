import React from "react";
import ReactDOM from 'react-dom';
import './index.css';

//Child Component, also a subclass of React.Component
//* this is a controlled conponent, since Board has full control over it
//* Square has been converted into a function component, renders with no state
function Square(props) {
    return (
        <button className="square" onClick={props.onClick}>
            {props.value}
        </button>
    )
}
  
  class Board extends React.Component { //Parent Component, also a subclass of React component
    constructor(props) {
        super(props)
        this.state = {
            squares: Array(9).fill(null),
            xIsNext: true
        }
    }
    handleClick(i) {
        const squares = this.state.squares.slice() //copy value of state
        squares[i] = this.state.xIsNext ? 'X' : 'O' //enabling second player 'O'
        this.setState({
            squares: squares,
            xIsNext: !this.state.xIsNext})
    }
    renderSquare(i) {
      return(<Square value = {this.state.squares[i]}  //passing props to square (value and onclick)
          onClick={() => this.handleClick(i)}
      />
      )
    }
  
    render() { 
        //determining winner and turns
        const winner = calculateWinner(this.state.squares)
        let status
        if (winner) {
            status = 'Winner: ' + winner 
        } else {
            status = 'Next player: ' + (this.state.xIsNext ? 'X' : '0')
        }
      return (
        <div>
          <div className="status">{status}</div>
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
  
  class Game extends React.Component {//Parent of Board
    render() {
      return (
        <div className="game">
          <div className="game-board">
            <Board />
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

  function calculateWinner(squares) {
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
      if (squares[a] && squares[a] === squares[b] && squares[a] === squares[c]) {
        return squares[a];
      }
    }
    return null;
  }
  