/* eslint-disable no-alert, no-console, react/forbid-prop-types */
import React from 'react';
import PropTypes from 'prop-types';
import axios from 'axios';
import { connect } from 'react-redux';
import CSSModules from 'react-css-modules';
import { setUsers } from '../actions';
import NewUser from './NewUser';
import User from './User';
import styles from '../styles/panel.css';

class Panel extends React.Component {
  constructor() {
    super();
    this.state = {};
  }

  showUsers() {
    this.setState({ showUsers: !this.state.showUsers });
    this.props.getUsers();
  }

  toggleAddPopup() {
    this.setState({ showAddPopup: !this.state.showAddPopup });
  }

  renderUsers() {
    const userList = [];
    this.props.users.forEach(user => userList.push(
      <User key={user.id} user={user} />,
    ));
    return userList;
  }

  render() {
    return (
      <div className="panel">
        <ul styleName="options">
          <li styleName="option">
            <button styleName="option-button" onClick={() => this.showUsers()}>
              Show userlist
            </button>
          </li>
          <li styleName="option">
            <button styleName="option-button" onClick={() => this.toggleAddPopup()}>
              Add user
            </button>
          </li>
        </ul>
        <ul className="users">
          {this.state.showUsers && this.props.users && this.renderUsers()}
        </ul>
        {
          this.state.showAddPopup &&
          <NewUser toggleAddPopup={() => this.toggleAddPopup()} users={this.props.users} />
        }
      </div>
    );
  }
}

Panel.propTypes = {
  users: PropTypes.array.isRequired,
  getUsers: PropTypes.func.isRequired,
  // showUserList: PropTypes.bool.isRequired,
  // showAdd: PropTypes.bool.isRequired,
  // showAddPopup: PropTypes.func.isRequired,
};


const mapDispatchToProps = dispatch => ({
  getUsers: () => {
    axios.get('/api/users').then((response) => {
      const message = response.data;

      if (message.status !== 'error') {
        dispatch(setUsers(message.users));
      } else {
        alert(message.text);
      }
    });
  },
});
const mapStateToProps = state => ({
  users: state.users,
});

export default connect(mapStateToProps, mapDispatchToProps)(CSSModules(Panel, styles));
