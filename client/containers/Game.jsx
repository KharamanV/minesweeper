/* eslint-disable no-console */
import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { fetchGame } from '../actions/game';
import Board from '../components/Board';

class Game extends Component {
  componentWillMount() {
    this.props.fetchGame();
  }

  render() {
    const { users } = this.props;

    return (
      <div>
        Hello
        <Board users={users} />
      </div>
    );
  }
}

Game.propTypes = {
  users: PropTypes.arrayOf(PropTypes.object).isRequired,
  fetchGame: PropTypes.func.isRequired,
};

const mapStateToProps = ({ users }) => ({ users });
const mapDispatchToProps = () => ({ fetchGame });

export default connect(mapStateToProps, mapDispatchToProps)(Game);
