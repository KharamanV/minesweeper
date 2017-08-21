/* eslint-disable no-alert, no-console, react/forbid-prop-types */

import React from 'react';
import PropTypes from 'prop-types';
import axios from 'axios';
import { connect } from 'react-redux';
import { removeUser, updateUser } from '../actions';

class User extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      username: props.username,
      role: props.role,
    };
  }

  setRole(e) {
    this.setState({ role: e.target.value });
  }

  setUsername(e) {
    this.setState({ username: e.target.value });
  }

  render() {
    return (
      <li className="panel__user">
        <input
          type="text"
          className="panel__column panel__username"
          value={this.state.username}
          onChange={e => this.setUsername(e)}
        />
        <select value={this.state.role} className="panel__column" onChange={e => this.setRole(e)}>
          <option value="player">Player</option>
          <option value="admin">Admin</option>
        </select>
        <div className="panel__column panel__edit">
          <button
            className="panel__user-button"
            onClick={() => this.props.save({
              id: this.props.id,
              username: this.state.username,
              role: this.state.role,
            })}
          >
            Save
          </button>
        </div>
        <div className="panel__column panel__remove">
          <button
            className="panel__user-button"
            onClick={() => this.props.remove(this.props.id)}
          >
            Remove
          </button>
        </div>
      </li>

    );
  }
}

// const User = props => (
// );

User.propTypes = {
  username: PropTypes.string.isRequired,
  role: PropTypes.string.isRequired,
  id: PropTypes.string.isRequired,
  remove: PropTypes.func.isRequired,
  save: PropTypes.func.isRequired,
};

const mapStateToProps = (state, ownProps) => ({
  username: ownProps.user.username,
  role: ownProps.user.role,
  id: ownProps.user.id,
});

const mapDispatchToProps = dispatch => ({
  remove: (id) => {
    axios.post('/api/users/remove', { id }).then((response) => {
      const message = response.data;
      if (message.status !== 'error') {
        dispatch(removeUser(id));
      } else {
        alert(message.text);
      }
    });
  },
  save: (user) => {
    axios.post('/api/users/update', user).then((response) => {
      const message = response.data;
      if (message.status !== 'error') {
        alert(message.status);
        dispatch(updateUser(user));
      } else {
        alert(message.text);
      }
    });
  },
});

const UserContainer = connect(mapStateToProps, mapDispatchToProps)(User);
export default UserContainer;
