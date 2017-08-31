/* eslint-disable react/no-array-index-key */
import React, { Component } from 'react';
import PropTypes from 'prop-types';
import CSSModules from 'react-css-modules';
import Square from '../Square/index';
import styles from './styles.css';

class Board extends Component {
  static propTypes = {
    data: PropTypes.arrayOf(PropTypes.arrayOf(PropTypes.object)).isRequired,
    gameId: PropTypes.string.isRequired,
    revealSquare: PropTypes.func.isRequired,
  };

  static defaultProps = {
    data: [],
  };

  revealSquare = (x, y) => {
    const { gameId, revealSquare } = this.props;

    revealSquare(gameId, { x, y });
  };

  render() {
    const { data } = this.props;

    return (
      <div styleName="board">
        {data.map((row, i) => (
          <div key={i} styleName="board-row">
            {row.map((square, j) => (
              <Square
                data={square}
                key={square.id}
                onReveal={this.revealSquare}
                x={j}
                y={i}
              />
            ))}
          </div>
        ))}
      </div>
    );
  }
}

export default CSSModules(Board, styles);
