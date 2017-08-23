/* eslint-disable no-alert */
import React from 'react';
import PropTypes from 'prop-types';
import axios from 'axios';
import { connect } from 'react-redux';
import { setState } from '../actions';

const SignIn = props => (
  <div className="app__signIn">
    Sign in
    <form className="app__form" onSubmit={e => props.signIn(e)} >
      <input id="username" type="text" className="app__input" defaultValue="admin" />
      <input id="password" type="password" className="app__input" defaultValue="admin" />
      <input type="submit" className="app__submit" />
    </form>
    or
    <a href="/api/auth/facebook">Login with Facebook</a>
    <a href="/api/auth/google">Login with Google</a>
  </div>
);
SignIn.propTypes = {
  signIn: PropTypes.func.isRequired };

const mapDispatchToProps = dispatch => ({
  signIn: (e) => {
    e.preventDefault();
    const username = document.getElementById('username').value;
    const password = document.getElementById('password').value;
    axios.post('/api/auth', { username, password }).then((response) => {
      const message = response.data;
      if (message.status !== 'error') {
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
const SignInContainer = connect(mapStateToProps, mapDispatchToProps)(SignIn);
export default SignInContainer;
