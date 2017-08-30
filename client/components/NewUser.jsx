/* eslint-disable no-alert */
import React from 'react';
import PropTypes from 'prop-types';
import axios from 'axios';
import { connect } from 'react-redux';
import CSSModules from 'react-css-modules';
import { addUser } from '../actions';
import styles from '../styles/newUser.css';

class NewUser extends React.Component {
  constructor() {
    super();
    this.state = {
      username: '',
      password: '',
      role: 'player',
    };
  }
  setUsername(e) {
    this.setState({ username: e.target.value });
  }
  setPassword(e) {
    this.setState({ password: e.target.value });
  }
  setRole(e) {
    this.setState({ role: e.target.value });
  }
  toggleAddPopup(e) {
    if (e.target.classList.contains('popup')) {
      this.props.toggleAddPopup();
    }
  }
  newUser(e, username, password, role) {
    e.preventDefault();
    this.props.toggleAddPopup();
    this.props.newUser(username, password, role);
  }
  render() {
    return (
      <div
        className="popup popup-new-user"
        styleName="popup"
        role="presentation"
        onClick={e => this.toggleAddPopup(e)}
      >
        <div className="popup__wrapper">
          New User
          <form
            className="popup__form"
            onSubmit={e =>
              this.newUser(e, this.state.username, this.state.password, this.state.role)}
          >
            <input
              id="username"
              type="text"
              styleName="popup__input"
              value={this.state.username}
              required
              onChange={e => this.setUsername(e)}
            />
            <input
              id="password"
              type="password"
              styleName="popup__input"
              value={this.state.password}
              required
              onChange={e => this.setPassword(e)}
            />
            <select
              value={this.state.role}
              styleName="popup__input"
              onChange={e => this.setRole(e)}
            >
              <option value="player">Player</option>
              <option value="admin">Admin</option>
            </select>
            <input type="submit" styleName="popup__submit" value="Add" />
          </form>
        </div>
      </div>
    );
  }
}

NewUser.propTypes = {
  newUser: PropTypes.func.isRequired,
  toggleAddPopup: PropTypes.func.isRequired,
};

const mapDispatchToProps = (dispatch, ownProps) => ({
  toggleAddPopup() {
    ownProps.toggleAddPopup();
  },
  newUser(username, password, role) {
    axios.post('/api/users/add', { username, password, role }).then((response) => {
      const message = response.data;
      if (message.status !== 'error') {
        dispatch(addUser(message.user));
      } else {
        alert(message.text);
      }
    });
  } });
// const mapStateToProps = (state, ownProps) => ({
//   username: state.username,
// });
export default connect(null, mapDispatchToProps)(CSSModules(NewUser, styles));
