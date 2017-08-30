/* eslint-disable no-console */
import React from 'react';
import PropTypes from 'prop-types';

const Square = ({ data }) => (
  <button>
    {data.isRevealed ? data.adjacentMinesCount : 'EMPTY'}
  </button>
);

Square.propTypes = {
  data: PropTypes.shape({
    isMine: PropTypes.bool,
    isRevealed: PropTypes.bool,
    isFlagged: PropTypes.bool,
    adjacentMinesCount: PropTypes.any,
  }),
};

Square.defaultProps = { data: {} };

export default Square;
