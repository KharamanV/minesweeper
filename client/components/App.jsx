import React from 'react';
import axios from 'axios';
import { connect } from 'react-redux';
import { setState } from '../actions';

const App = () => (
  <div className="app">
    Hello from React!
    <form className="app__form">
      <input id="username" type="text" className="app__input" />
      <input id="password" type="password" className="app__input" />
      <input type="submit" className="app__submit" />
    </form>
  </div>
);


const mapDispatchToProps = dispatch => ({
  sign: () => {
    const username = document.getElementById('username').value;
    const password = document.getElementById('password').value;
    axios.post('/login', 'POST', { username, password }).then((response) => {
      const message = JSON.parse(response);
      // console.log(message);
      if (!message.error) {
        dispatch(setState(message));
      } else {
        dispatch(setState(message));
      }
    });
  } });
const AppContainer = connect(null, mapDispatchToProps)(App);
export default AppContainer;
