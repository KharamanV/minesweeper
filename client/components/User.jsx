/* eslint-disable no-alert, no-console, react/forbid-prop-types */

import React from 'react';
import PropTypes from 'prop-types';
import axios from 'axios';
import { connect } from 'react-redux';
import CSSModules from 'react-css-modules';
import { removeUser, updateUser, addUser } from '../actions';
import styles from '../styles/user.css';

class User extends React.Component {
  constructor(props) {
    super(props);
    this.state = props.user ?
      {
        username: props.user.username || '',
        password: '',
        name: props.user.name || '',
        role: props.user.role,
      } :
      {
        username: '',
        password: '',
        name: '',
        role: 'player',
      };
  }

  setRole(e) {
    this.setState({ role: e.target.value });
  }

  setUsername(e) {
    this.setState({ username: e.target.value });
  }

  setPassword(e) {
    this.setState({ password: e.target.value });
  }

  setName(e) {
    this.setState({ name: e.target.value });
  }

  render() {
    return (
      <li styleName="user">
        <p styleName="id">{this.props.user ? this.props.user.id : 'New user:'}</p>
        <input
          type="text"
          styleName="column"
          value={this.state.username}
          onChange={e => this.setUsername(e)}
        />
        <input
          type="text"
          styleName="column"
          value={this.state.password}
          onChange={e => this.setPassword(e)}
        />
        <input
          type="text"
          styleName="column"
          value={this.state.name}
          onChange={e => this.setName(e)}
        />
        <select value={this.state.role} styleName="column" onChange={e => this.setRole(e)}>
          <option value="player">Player</option>
          <option value="admin">Admin</option>
        </select>
        <div styleName="column">
          <button
            styleName="user-button"
            onClick={this.props.user
              ? () => this.props.save({
                id: this.props.user.id,
                ...this.state,
              }, () => this.setState({ password: '' }))
              : () => this.props.create(this.state)
            }
          >
            Save
          </button>
        </div>
        <div styleName="column">
          <button
            styleName="user-button"
            onClick={this.props.user
              ? () => this.props.remove(this.props.user.id)
              : () => this.props.cancel()
            }
          >
            Remove
          </button>
        </div>
      </li>

    );
  }
}

User.propTypes = {
  user: PropTypes.shape({
    username: PropTypes.string,
    password: PropTypes.string,
    name: PropTypes.string,
    role: PropTypes.string.isRequired,
    id: PropTypes.string.isRequired,
  }),
  remove: PropTypes.func.isRequired,
  cancel: PropTypes.func,
  create: PropTypes.func.isRequired,
  save: PropTypes.func.isRequired,
};

User.defaultProps = {
  user: null,
  cancel: null,
};

const mapDispatchToProps = (dispatch, ownProps) => ({
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
  save: (user, resetPassword) => {
    axios.put('/api/users/update', user)
      .then((response) => {
        alert(response.statusText);
        console.log(response.data);
        dispatch(updateUser(response.data));
        resetPassword();
      })
      .catch(err => alert(err.response.statusText));
  },
  create(user) {
    axios.post('/api/users/add', user)
      .then((response) => {
        const message = response.data;
        ownProps.cancel();
        dispatch(addUser(message));
      })
      .catch(err => alert(err.response.statusText));
  },
});

export default connect(null, mapDispatchToProps)(CSSModules(User, styles));
