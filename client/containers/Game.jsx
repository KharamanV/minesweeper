/* eslint-disable react/prefer-stateless-function */
import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import Board from '../components/Board';

class Game extends Component {
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
};

const mapStateToProps = ({ users }) => ({ users });

export default connect(mapStateToProps)(Game);
