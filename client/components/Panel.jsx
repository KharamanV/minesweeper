/* eslint-disable no-alert, no-console, react/forbid-prop-types */
import React from 'react';
import PropTypes from 'prop-types';
import axios from 'axios';
import { connect } from 'react-redux';
import CSSModules from 'react-css-modules';
<<<<<<< c626862f24cfe3583dffa05f4fc369c0f56bfd1e
<<<<<<< 7dbd5d604f9287a265f1abf8b249eeebf4082835
import { setUsers, setPresets } from '../actions';
import NewUser from './NewUser';
import User from './User';
import Preset from './Preset';
import styles from '../styles/panel.css';
=======
import { setUsers } from '../actions';
=======
import { setUsers, setPresets } from '../actions';
>>>>>>> Add basic presets management to admin panel
import NewUser from './NewUser';
import User from './User';
import Preset from './Preset';
import styles from '../styles/panel.css';

>>>>>>> Add basic styles

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
<<<<<<< c626862f24cfe3583dffa05f4fc369c0f56bfd1e

=======
>>>>>>> Add basic presets management to admin panel
  showPresets() {
    this.setState({ tab: 'presets' });
    this.props.getPresets();
  }
<<<<<<< c626862f24cfe3583dffa05f4fc369c0f56bfd1e

=======
>>>>>>> Add basic presets management to admin panel
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
            <button styleName="option-button" onClick={() => this.toggleAddPopup()}>
              Add user
            </button>
          </li>
        </ul>
        {this.state.tab === 'users' &&
          <ul className="users">
            {this.props.users && this.renderUsers()}
          </ul>
        }
        {this.state.tab === 'presets' &&
          <ul className="presets">
            {this.props.presets && this.renderPresets()}
          </ul>
        }
        {this.state.showAddPopup &&
          <NewUser toggleAddPopup={() => this.toggleAddPopup()} users={this.props.users} />}
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
