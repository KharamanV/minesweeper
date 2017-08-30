import React from 'react';
import PropTypes from 'prop-types';
import Square from './Square';

const Board = ({ data }) => (
  <div>
    {data.map((row, i) => row.map((square, j) => (
      <Square
        data={square}
        x={j}
        y={i}
      />
    )))}
  </div>
);

Board.propTypes = {
  data: PropTypes.arrayOf(PropTypes.arrayOf(PropTypes.object)),
};

Board.defaultProps = {
  data: [],
};

export default Board;
