/* eslint-disable no-alert, no-console, react/forbid-prop-types */

import React from 'react';
import PropTypes from 'prop-types';
import axios from 'axios';
import { connect } from 'react-redux';
import { setState } from '../actions';

const getUsers = (users) => {
  const userList = [];
  for (let i = 0; i < users.length; i += 1) {
    userList.push(
      <li key={users[i].id} className="panel__user">
        <div className="panel__username">{users[i].username}</div>
        <div className="panel__role">{users[i].role}</div>
        <div className="panel__edit"><button className="panel__user-button">Edit</button></div>
        <div className="panel__remove"><button className="panel__user-button">Remove</button></div>
      </li>,
    );
  }
  return userList;
};

const Panel = props => (
  <div className="app__panel">
    <ul className="panel__options">
      <li className="panel__item">
        <button onClick={() => props.showUsers()}>Show userlist</button>
      </li>
      <li className="panel__item"><button>Add user</button></li>
    </ul>
    <ul className="panel__users">
      {props.showUserList && props.users && getUsers(props.users)}
    </ul>
  </div>
);
Panel.propTypes = {
  users: PropTypes.array.isRequired,
  showUserList: PropTypes.bool.isRequired,
  showUsers: PropTypes.func.isRequired,
};


const mapDispatchToProps = dispatch => ({
  showUsers: () => {
    axios.get('/api/users').then((response) => {
      const message = response.data;
      console.log(message);
      if (message.status !== 'error') {
        dispatch(setState({ users: message.users, showUserList: true }));
      } else {
        alert(message.text);
      }
    });
  } });
const mapStateToProps = state => ({
  users: state.users,
  showUserList: state.showUserList,
});
const PanelContainer = connect(mapStateToProps, mapDispatchToProps)(Panel);
export default PanelContainer;
