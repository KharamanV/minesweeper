import React, { Component } from 'react';
import Square from './Square';

class Board extends Component {
  constructor(props) {
    super(props);
  }

  renderSquares() {
    const { size } = this.props;
    const rows = [];

    for (let i = 0; i < size; i++) {
      const squares = [];

      for (let j = 0; j < size; j++) {
        squares.push(<Square x={i} y={j} />);
      }

      squares.push(<br />);
      rows.push(squares);
    }

    return rows;
  }


  render() {
    const rows = this.renderSquares();

    return (
      <div className="board">
        <h2>Mines: {this.props.minesCount}</h2>

        {rows}
      </div>
    );
  }
}

export default Board;