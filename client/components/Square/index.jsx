import React, { Component } from 'react';
import PropTypes from 'prop-types';
import CSSModules from 'react-css-modules';
import classNames from 'classnames';
import styles from './styles.css';

class Square extends Component {
  static propTypes = {
    data: PropTypes.shape({
      isMine: PropTypes.bool,
      isRevealed: PropTypes.bool,
      isFlagged: PropTypes.bool,
      adjacentMinesCount: PropTypes.any,
    }).isRequired,
    onReveal: PropTypes.func.isRequired,
    x: PropTypes.number.isRequired,
    y: PropTypes.number.isRequired,
  };

  onSquareReveal = () => {
    const { onReveal, x, y, data } = this.props;

    if (data.isRevealed) {
      return false;
    }

    return onReveal(x, y);
  };

  render() {
    const { data } = this.props;
    const adjacentMines = (
      data.isRevealed
      && !data.isMine
      && data.adjacentMinesCount > 0
      && data.adjacentMinesCount
    );
    const styleNames = classNames('square', {
      mine: data.isMine,
      revealed: data.isRevealed,
      adjacent1: adjacentMines === 1,
      adjacent2: adjacentMines === 2,
      adjacent3: adjacentMines === 3,
    });

    return (
      <div
        styleName={styleNames}
        onClick={this.onSquareReveal}
        onContextMenu={e => e.preventDefault()}
        role="presentation"
      >
        {adjacentMines}
      </div>
    );
  }
}

export default CSSModules(Square, styles, { allowMultiple: true });
