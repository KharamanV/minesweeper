/* eslint-disable no-alert, no-console, react/forbid-prop-types */

import React from 'react';
import PropTypes from 'prop-types';
import axios from 'axios';
import { connect } from 'react-redux';
import CSSModules from 'react-css-modules';
import { removeUser, updateUser } from '../actions';
import styles from '../styles/user.css';

class User extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      username: props.username,
      name: props.name,
      role: props.role,
    };
  }

  setRole(e) {
    this.setState({ role: e.target.value });
  }

  setUsername(e) {
    this.setState({ username: e.target.value });
  }

  setName(e) {
    this.setState({ name: e.target.value });
  }

  render() {
    return (
      <li styleName="user">
        <p styleName="id">{this.props.id}</p>
        <input
          type="text"
          styleName="column"
          value={this.state.username}
          onChange={e => this.setUsername(e)}
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
            onClick={() => this.props.save({
              id: this.props.id,
              ...this.state,
            })}
          >
            Save
          </button>
        </div>
        <div styleName="column">
          <button
            styleName="user-button"
            onClick={() => this.props.remove(this.props.id)}
          >
            Remove
          </button>
        </div>
      </li>

    );
  }
}

User.propTypes = {
  username: PropTypes.string,
  name: PropTypes.string,
  role: PropTypes.string.isRequired,
  id: PropTypes.string.isRequired,
  remove: PropTypes.func.isRequired,
  save: PropTypes.func.isRequired,
};

User.defaultProps = {
  username: '',
  name: '',
};

const mapStateToProps = (state, ownProps) => ({
  username: ownProps.user.username,
  name: ownProps.user.name,
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

export default connect(mapStateToProps, mapDispatchToProps)(CSSModules(User, styles));
