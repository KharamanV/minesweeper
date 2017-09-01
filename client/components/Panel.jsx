/* eslint-disable no-alert, no-console, react/forbid-prop-types */
import React from 'react';
import PropTypes from 'prop-types';
import axios from 'axios';
import { connect } from 'react-redux';
import CSSModules from 'react-css-modules';
import { setUsers, setPresets } from '../actions';
// import NewUser from './NewUser';
import User from './User';
import Preset from './Preset';
import styles from '../styles/panel.css';

class Panel extends React.Component {
  constructor() {
    super();
    this.state = {
      tab: 'users',
    };
  }
  componentWillMount() {
    this.props.getUsers();
  }

  showUsers() {
    this.setState({ tab: 'users' });
    this.props.getUsers();
  }
  showPresets() {
    this.setState({ tab: 'presets' });
    this.props.getPresets();
  }
  toggleAddUser() {
    this.setState({ showAddUser: !this.state.showAddUser });
  }
  renderUsers() {
    const userList = [];
    this.props.users.forEach(user => userList.push(
      <User key={user.id} user={user} />,
    ));
    return userList;
  }
  renderPresets() {
    const presetList = [];

    this.props.presets.forEach(preset => presetList.push(
      <Preset key={preset.id} preset={preset} />,
    ));

    return presetList;
  }

  render() {
    return (
      <div className="panel">
        <ul styleName="options">
          <li styleName="option">
            <button styleName="option-button" onClick={() => this.showUsers()}>
              Users
            </button>
          </li>
          <li styleName="option">
            <button styleName="option-button" onClick={() => this.showPresets()}>
              Presets
            </button>
          </li>
          <li styleName="option">
            <button styleName="option-button" onClick={() => this.toggleAddUser()}>
              Add user
            </button>
          </li>
        </ul>
        {this.state.tab === 'users' &&
          <ul className="users">
            <li styleName="user">
              <p styleName="id">ID</p>
              <p styleName="column">Username</p>
              <p styleName="column">Password</p>
              <p styleName="column">Display name</p>
              <p styleName="column">Role</p>
            </li>
            {this.props.users && this.renderUsers()}
            {this.state.showAddUser && <User key="newUser" cancel={() => this.toggleAddUser()} />}
          </ul>
        }
        {this.state.tab === 'presets' &&
          <ul className="presets">
            <li styleName="user">
              <p styleName="id">ID</p>
              <p styleName="column">Name</p>
              <p styleName="column-small">Width</p>
              <p styleName="column-small">Height</p>
              <p styleName="column-small">Mines</p>
              <p styleName="column-small">Factor</p>
            </li>
            {this.props.presets && this.renderPresets()}
          </ul>
        }
      </div>
    );
  }
}

Panel.propTypes = {
  users: PropTypes.array.isRequired,
  presets: PropTypes.array.isRequired,
  getUsers: PropTypes.func.isRequired,
  getPresets: PropTypes.func.isRequired,
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
  getPresets: () => {
    axios.get('/api/games/presets')
      .then((response) => {
        const message = response.data;
        console.log(message);
        dispatch(setPresets(message));
      })
      .catch(err => alert(err.response.statusText));
  },
});
const mapStateToProps = state => ({
  users: state.users,
  presets: state.presets,
});

export default connect(mapStateToProps, mapDispatchToProps)(CSSModules(Panel, styles));
