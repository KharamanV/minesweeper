/* eslint-disable */
import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { fetchGameRequest, revealSquareRequest } from '../actions/game';
import Board from '../components/Board/index';

class Game extends Component {
  static propTypes = {
    game: PropTypes.shape({
      _id: PropTypes.string,
      width: PropTypes.number,
      height: PropTypes.number,
      board: PropTypes.arrayOf(PropTypes.array),
      isFetching: PropTypes.bool,
    }),
    fetchGame: PropTypes.func,
    revealSquare: PropTypes.func,
  };

  componentWillMount() {
    this.props.fetchGame('59946e890ddfc046f2a04970');
  }

  render() {
    const { game, revealSquare } = this.props;

    return (
      <div>
        {/* TODO: Find solution for isFetching flow */}
        {!game.isFetching && game.board && (
          <div>
            <p>Width: {game.width}</p>
            <p>Height: {game.height}</p>

            <Board
              data={game.board}
              gameId={game._id}
              revealSquare={revealSquare}
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

export default connect(mapStateToProps, mapDispatchToProps)(Game);
