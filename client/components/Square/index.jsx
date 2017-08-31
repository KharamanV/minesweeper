/* eslint-disable no-console */
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
    const styleNames = classNames('square', {
      mine: data.isMine,
      empty: data.isRevealed && data.adjacentMinesCount === 0 && !data.isMine,
    });

    return (
      <div
        styleName={styleNames}
        onClick={this.onSquareReveal}
        role="presentation"
      >
        {data.isRevealed && data.adjacentMinesCount > 0 && data.adjacentMinesCount}
        {data.isRevealed && data.isMine && 'X'}
      </div>
    );
  }
}

export default CSSModules(Square, styles, { allowMultiple: true });
