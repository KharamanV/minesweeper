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

  state = { isFlagged: false };

  onSquareReveal = () => {
    const { onReveal, x, y, data } = this.props;

    if (data.isRevealed || this.state.isFlagged) {
      return false;
    }

    return onReveal(x, y);
  };

  flagSquare = (e) => {
    e.preventDefault();

    if (this.props.data.isRevealed) {
      return false;
    }

    return this.setState({ isFlagged: !this.state.isFlagged });
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
      flagged: this.state.isFlagged,
      adjacent1: adjacentMines === 1,
      adjacent2: adjacentMines === 2,
      adjacent3: adjacentMines === 3,
    });

    return (
      <div
        styleName={styleNames}
        onClick={this.onSquareReveal}
        onContextMenu={this.flagSquare}
        role="presentation"
      >
        {adjacentMines}
      </div>
    );
  }
}

export default CSSModules(Square, styles, { allowMultiple: true });
