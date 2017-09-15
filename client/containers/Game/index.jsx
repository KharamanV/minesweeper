/* eslint-disable */
import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import CSSModules from 'react-css-modules';
import { fetchGameRequest, revealSquareRequest } from '../../actions/game';
import styles from './styles.css';
import Board from '../../components/Board/index';

class Game extends Component {
  static propTypes = {
    game: PropTypes.shape({
      width: PropTypes.number,
      height: PropTypes.number,
      board: PropTypes.arrayOf(PropTypes.array),
      isOver: PropTypes.bool,
      isFetching: PropTypes.bool,
    }).isRequired,
    gameId: PropTypes.string.isRequired,
    fetchGame: PropTypes.func.isRequired,
    onGameEnd: PropTypes.func.isRequired,
    revealSquare: PropTypes.func.isRequired,
  };

  componentDidMount() {
    const { fetchGame, gameId } = this.props;

    fetchGame(gameId);
  }

  componentWillUpdate(nextProps) {
    const { fetchGame, gameId, game, onGameEnd } = this.props;

    if (gameId !== nextProps.gameId) {
      fetchGame(nextProps.gameId);
    }

    if (!game.isOver && nextProps.game.isOver) {
      onGameEnd(!!nextProps.game.isWon);
    }
  }

  onSquareReveal = (x, y) => {
    const { revealSquare, gameId } = this.props;

    revealSquare(gameId, { x, y });
  }

  render() {
    const { game, gameId } = this.props;

    return (
      <div styleName="game-container">
        <h1>{game.isOver && (game.isWon ? 'YOU WIN' : 'YOU FUCKED UP, BRO')}</h1>

        {/* TODO: Find solution for isFetching flow */}
        {!game.isFetching && game.board && (
          <div styleName="game">
            <button styleName={`play-button ${game.isOver ? 'lose' : ''}`} />

            <Board
              data={game.board}
              revealSquare={this.onSquareReveal}
              disabled={game.isOver}
            />
          </div>
        )}
      </div>
    );
  }
}

const mapStateToProps = ({ game }) => ({ game });
const mapDispatchToProps = ({
  fetchGame: fetchGameRequest,
  revealSquare: revealSquareRequest,
});

export default connect(mapStateToProps, mapDispatchToProps)(CSSModules(
  Game,
  styles,
  { allowMultiple: true },
));
