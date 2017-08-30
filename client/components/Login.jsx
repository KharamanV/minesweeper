/* eslint-disable no-alert, no-console */
import React from 'react';
import PropTypes from 'prop-types';
import axios from 'axios';
import { connect } from 'react-redux';
import CSSModules from 'react-css-modules';
import { Link, Redirect } from 'react-router-dom';
import { setAuth } from '../actions';
import styles from '../styles/auth.css';

class SignIn extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      username: 'admin',
      password: 'admin',
    };
  }

  signInClick(e) {
    e.preventDefault();
    this.props.signIn(this.state);
  }

  handleUsername(e) {
    this.setState({ username: e.target.value });
  }

  handlePassword(e) {
    this.setState({ password: e.target.value });
  }

  render() {
    return (
      this.props.auth ? (
        <Redirect to="/" />
      ) : (
        <div className="app__signIn">
          Sign in
          <form styleName="form" onSubmit={e => this.signInClick(e)}>
            <div styleName="input-wrapper">
              <label htmlFor="username" styleName="label">Login:</label>
              <input
                id="username"
                required
                type="text"
                styleName="input"
                value={this.state.username}
                onChange={e => this.handleUsername(e)}
              />
            </div>
            <div styleName="input-wrapper">
              <label htmlFor="password" styleName="label">Password:</label>
              <input
                id="password"
                required
                type="password"
                styleName="input"
                value={this.state.password}
                onChange={e => this.handlePassword(e)}
              />
            </div>
            <input styleName="submit" type="submit" value="Sign In" />
          </form>
          <p>New user? Try to <Link
            className="app__nav-link"
            to="/register"
          >register
          </Link>
          </p>
          or
          <a href="/api/auth/facebook">Login with Facebook</a>
          <a href="/api/auth/google">Login with Google</a>
        </div>
      )
    );
  }
}

SignIn.propTypes = {
  signIn: PropTypes.func.isRequired,
  auth: PropTypes.bool.isRequired,
};

const mapStateToProps = state => ({
  auth: state.auth.isAuthenticated,
});

const mapDispatchToProps = dispatch => ({
  signIn(credentials) {
    axios.post('/api/auth', credentials).then((response) => {
      if (response.status !== 200) {
        alert(response.statusText);
      } else {
        localStorage.setItem('jwt', response.data.token);
        dispatch(setAuth(true));
      }
    });
  },
});

export default connect(mapStateToProps, mapDispatchToProps)(CSSModules(SignIn, styles));
