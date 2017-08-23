/* eslint-disable no-alert */
import React from 'react';
import PropTypes from 'prop-types';
import axios from 'axios';
import { connect } from 'react-redux';
import { setState } from '../actions';

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

  render() {
    return (
      <div
        className="popup popup-new-user"
        role="presentation"
        onClick={e => this.props.closePopup(e)}
      >
        <div className="popup__wrapper">
          New User
          <form
            className="popup__form"
            onSubmit={e =>
              this.props.addUser(e, this.state.username, this.state.password, this.state.role)}
          >
            <input
              id="username"
              type="text"
              className="popup__input"
              value={this.state.username}
              required
              onChange={e => this.setUsername(e)}
            />
            <input
              id="password"
              type="password"
              className="popup__input"
              value={this.state.password}
              required
              onChange={e => this.setPassword(e)}
            />
            <select
              value={this.state.role}
              className="popup__input"
              onChange={e => this.setRole(e)}
            >
              <option value="player">Player</option>
              <option value="admin">Admin</option>
            </select>
            <input type="submit" className="popup__submit" value="Add" />
          </form>
        </div>
      </div>
    );
  }
}

NewUser.propTypes = {
  addUser: PropTypes.func.isRequired,
  closePopup: PropTypes.func.isRequired,
};

const mapDispatchToProps = (dispatch, ownProps) => ({
  closePopup: (e) => {
    if (e.target.classList.contains('popup')) {
      dispatch(setState({ showAdd: false }));
    }
  },
  addUser: (e, username, password, role) => {
    e.preventDefault();
    axios.post('/api/users/add', { username, password, role }).then((response) => {
      const message = response.data;
      if (message.status !== 'error') {
        dispatch(setState({ users: [...ownProps.users, message.user], showAdd: false }));
      } else {
        alert(message.text);
      }
    });
  } });
// const mapStateToProps = state => ({
//   username: state.username,
// });
const NewUserContainer = connect(null, mapDispatchToProps)(NewUser);
export default NewUserContainer;
