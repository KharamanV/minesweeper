/* eslint no-console: 0 */
import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { fetchUserRequest, updateUserOption, updateUserRequest } from '../actions/user';

class Profile extends React.Component {
  constructor() {
    super();

    this.handleSubmit = this.handleSubmit.bind(this);
    this.setValue = this.setValue.bind(this);
  }

  componentWillMount() {
    this.props.fetchUserRequest();
  }

  setValue(e) {
    e.preventDefault();
    const target = e.target;

    this.props.updateUserOption({ [target.name]: target.value });
  }

  handleSubmit(e) {
    e.preventDefault();

    if (this.props.user.password === this.props.user.confirmedPassword) {
      this.props.updateUserRequest(this.props.user);
    }
  }

  render() {
    return (
      <form onSubmit={this.handleSubmit}>
        <label htmlFor="name">Name: </label>
        <input
          type="text"
          value={this.props.user.name}
          name="name"
          id="name"
          onInput={this.setValue}
        /><br />

        <label htmlFor="username">Username: </label>
        <input
          type="text"
          value={this.props.user.username}
          name="username"
          id="username"
          onInput={this.setValue}
        /><br />

        <label htmlFor="password">Password: </label>
        <input
          type="password"
          name="password"
          id="password"
          onInput={this.setValue}
        /><br />

        <label htmlFor="password">Confirm Password: </label>
        <input
          type="password"
          name="confirmedPassword"
          id="confirmedPassword"
          onInput={this.setValue}
        /><br />

        <input type="submit" value="Update" />
      </form>
    );
  }
}

Profile.propTypes = {
  user: PropTypes.shape({
    name: PropTypes.string,
    role: PropTypes.string,
    username: PropTypes.string,
    password: PropTypes.string,
    confirmedPassword: PropTypes.string,
  }),
  fetchUserRequest: PropTypes.func.isRequired,
  updateUserOption: PropTypes.func.isRequired,
  updateUserRequest: PropTypes.func.isRequired,
};

Profile.defaultProps = {
  user: {},
};

const mapStateToProps = ({ user }) => ({ user });
const mapDispatchToProps = ({
  fetchUserRequest,
  updateUserOption,
  updateUserRequest,
});

export default connect(mapStateToProps, mapDispatchToProps)(Profile);
