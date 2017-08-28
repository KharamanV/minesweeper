/* eslint-disable no-alert, no-console */
import React from 'react';
import PropTypes from 'prop-types';
import axios from 'axios';
import { connect } from 'react-redux';
import CSSModules from 'react-css-modules';
import { setState } from '../actions';
import styles from '../styles/login.css';

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

  signUpClick(e) {
    e.preventDefault();
    this.props.signUp(this.state);
  }

  handleUsername(e) {
    this.setState({ username: e.target.value });
  }

  handlePassword(e) {
    this.setState({ password: e.target.value });
  }

  render() {
    return (
      <div className="app__signIn">
        Sign in
        <form className="app__form" >
          <input
            type="text"
            styleName="input"
            value={this.state.username}
            onChange={e => this.handleUsername(e)}
          />
          <input
            type="password"
            styleName="input"
            value={this.state.password}
            onChange={e => this.handlePassword(e)}
          />
          <button className="app__submit" onClick={e => this.signInClick(e)}>
            Sign In
          </button>
          <button className="app__submit" onClick={e => this.signUpClick(e)}>
            Sign Up
          </button>
        </form>
        or
        <a href="/api/auth/facebook">Login with Facebook</a>
        <a href="/api/auth/google">Login with Google</a>
      </div>
    );
  }
}

SignIn.propTypes = {
  signIn: PropTypes.func.isRequired,
  signUp: PropTypes.func.isRequired,
};

const mapDispatchToProps = dispatch => ({
  signIn: (credentials) => {
    axios.post('/api/auth', credentials).then((response) => {
      const message = response.data;
      if (message.status !== 'error') {
        localStorage.setItem('jwt', response.headers.authorization);
        dispatch(setState({ username: message.username }));
      } else {
        alert(message.text);
      }
    });
  },
  signUp: (credentials) => {
    axios.post('/api/auth/register', credentials).then((response) => {
      const message = response.data;
      if (message.status !== 'error') {
        localStorage.setItem('jwt', response.headers.authorization);
        dispatch(setState({ username: message.username }));
      } else {
        alert(message.text);
      }
    });
  },
});

const mapStateToProps = state => ({
  username: state.username,
});

export default connect(mapStateToProps, mapDispatchToProps)(CSSModules(SignIn, styles));
