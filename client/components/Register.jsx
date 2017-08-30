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
      name: '',
      username: '',
      password: '',
      passwordConfirm: '',
    };
  }

  signUpClick(e) {
    e.preventDefault();
    if (this.state.password === this.state.passwordConfirm) {
      const data = {
        name: this.state.name,
        username: this.state.username,
        password: this.state.password,
      };
      this.props.signUp(data);
    } else {
      alert('Passwords are different!');
    }
  }

  handleName(e) {
    this.setState({ name: e.target.value });
  }

  handleUsername(e) {
    this.setState({ username: e.target.value });
  }

  handlePassword(e) {
    this.setState({ password: e.target.value });
  }

  handlePasswordConfirm(e) {
    this.setState({ passwordConfirm: e.target.value });
  }

  render() {
    return (
      this.props.auth ? (
        <Redirect to="/" />
      ) : (
        <div className="app__signIn">
          Register
          <form styleName="form" onSubmit={e => this.signUpClick(e)}>
            <div styleName="input-wrapper">
              <label htmlFor="name" styleName="label">Name:</label>
              <input
                id="name"
                required
                type="text"
                styleName="input"
                value={this.state.name}
                onChange={e => this.handleName(e)}
              />
            </div>
            <div styleName="input-wrapper">
              <label htmlFor="name" styleName="label">Login:</label>
              <input
                required
                type="text"
                styleName="input"
                value={this.state.username}
                onChange={e => this.handleUsername(e)}
              />
            </div>
            <div styleName="input-wrapper">
              <label htmlFor="name" styleName="label">Password:</label>
              <input
                required
                type="password"
                styleName="input"
                value={this.state.password}
                onChange={e => this.handlePassword(e)}
              />
            </div>
            <div styleName="input-wrapper">
              <label htmlFor="name" styleName="label">Confirm:</label>
              <input
                required
                type="password"
                styleName="input"
                value={this.state.passwordConfirm}
                onChange={e => this.handlePasswordConfirm(e)}
              />
            </div>
            <input styleName="submit" type="submit" value="Sign Up" />
          </form>
          <p>Already have account? Try to <Link
            className="app__nav-link"
            to="/login"
          >sign in
          </Link>
          </p>
        </div>
      )
    );
  }
}

SignIn.propTypes = {
  signUp: PropTypes.func.isRequired,
  auth: PropTypes.bool.isRequired,
};

const mapStateToProps = state => ({
  auth: state.isAuthenticated,
});

const mapDispatchToProps = dispatch => ({
  signUp(credentials) {
    axios.post('/api/auth/register', credentials)
      .then((response) => {
        if (response.status !== 200) {
          alert(response.statusText);
        } else {
          localStorage.setItem('jwt', response.data.token);
          dispatch(setAuth(true));
        }
      })
      .catch((err) => {
        if (err.response.status === 409) {
          alert('Username is alredy taken');
        } else {
          alert(err.response.statusText);
        }
      });
  },
});

export default connect(mapStateToProps, mapDispatchToProps)(CSSModules(SignIn, styles));
