/* eslint-disable react/no-array-index-key */
import React, { Component } from 'react';
import PropTypes from 'prop-types';
import CSSModules from 'react-css-modules';
import Square from '../Square/index';
import styles from './styles.css';

class Board extends Component {
  static propTypes = {
    data: PropTypes.arrayOf(PropTypes.arrayOf(PropTypes.object)).isRequired,
    revealSquare: PropTypes.func,
    disabled: PropTypes.bool,
  };

  static defaultProps = {
    data: [],
    disabled: false,
    revealSquare: null,
  };

  revealSquare = (x, y) => {
    const { revealSquare, disabled } = this.props;

    return !disabled && revealSquare(x, y);
  };

  render() {
    const { data } = this.props;

    return (
      <div>
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
      </div>
    );
  }
}

export default CSSModules(Board, styles);
