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
      _id: PropTypes.string,
      width: PropTypes.number,
      height: PropTypes.number,
      board: PropTypes.arrayOf(PropTypes.array),
      isOver: PropTypes.bool,
      isFetching: PropTypes.bool,
    }).isRequired,
    fetchGame: PropTypes.func.isRequired,
    revealSquare: PropTypes.func.isRequired,
  };

  componentWillMount() {
    this.props.fetchGame('59946e890ddfc046f2a04971');
  }

  render() {
    const { game, revealSquare } = this.props;
    const { _id: id } = game;

    return (
      <div styleName="game-container">
        {/* TODO: Find solution for isFetching flow */}
        {!game.isFetching && game.board && (
          <div styleName="game">
            <p>Size: {game.width} x {game.height}</p>

            <button
              styleName={`play-button ${game.isOver ? 'lose' : ''}`}
              onClick={() => this.props.fetchGame('59946e890ddfc046f2a04971')}
            />

            <Board
              data={game.board}
              gameId={id}
              revealSquare={revealSquare}
              disabled={game.isOver}
            />

            {game.isOver && <p>GAME OVER</p>}
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
