/* eslint-disable */
import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { fetchGameRequest } from '../actions/game';
import Board from '../components/Board';

class Game extends Component {
  componentWillMount() {
    this.props.fetchGame('59946e890ddfc046f2a04970');
  }

  render() {
    const { game } = this.props;

    return (
      <div>
        <p>Width: { game.width }</p>
        <p>Height: { game.height }</p>
        <Board data={game.board} />
      </div>
    );
  }
}

Game.propTypes = {
  game: PropTypes.shape({
    _id: PropTypes.string,
    width: PropTypes.number,
    height: PropTypes.number,
    board: PropTypes.arrayOf(PropTypes.array),
  }),
  fetchGame: PropTypes.func.isRequired,
};

Game.defaultProps = { game: {} };

const mapStateToProps = ({ game }) => ({ game });
const mapDispatchToProps = ({
  fetchGame: fetchGameRequest,
});

export default connect(mapStateToProps, mapDispatchToProps)(Game);
