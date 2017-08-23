/* eslint-disable no-alert, no-console, react/forbid-prop-types */

import React from 'react';
import PropTypes from 'prop-types';
import axios from 'axios';
import { connect } from 'react-redux';
import { setState } from '../actions';
import NewUser from './NewUser';
import User from './User';

const getUsers = (users) => {
  const userList = [];
  users.forEach(user => userList.push(
    <User key={user.id} user={user} />,
  ));
  return userList;
};

const Panel = props => (
  <div className="app__panel">
    <ul className="panel__options">
      <li className="panel__item">
        <button onClick={() => props.showUsers()}>Show userlist</button>
      </li>
      <li className="panel__item">
        <button onClick={() =>
          props.showAddPopup(true)}
        >
          Add user
        </button>
      </li>
    </ul>
    <ul className="panel__users">
      {props.showUserList && props.users && getUsers(props.users)}
    </ul>
    {props.showAdd && <NewUser users={props.users} />}
  </div>
);

Panel.propTypes = {
  users: PropTypes.array.isRequired,
  showUserList: PropTypes.bool.isRequired,
  showUsers: PropTypes.func.isRequired,
  showAdd: PropTypes.bool.isRequired,
  showAddPopup: PropTypes.func.isRequired,
};


const mapDispatchToProps = dispatch => ({
  showAddPopup: (showAdd) => {
    dispatch(setState({ showAdd }));
  },
  showUsers: () => {
    axios.get('/api/users').then((response) => {
      const message = response.data;
      if (message.status !== 'error') {
        dispatch(setState({ users: message.users, showUserList: true }));
      } else {
        alert(message.text);
      }
    });
  },
});
const mapStateToProps = state => ({
  users: state.users,
  showUserList: state.showUserList,
  showAdd: state.showAdd,
});
const PanelContainer = connect(mapStateToProps, mapDispatchToProps)(Panel);
export default PanelContainer;
