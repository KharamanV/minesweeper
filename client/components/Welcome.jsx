/* eslint-disable no-alert, no-console */
import React from 'react';
import PropTypes from 'prop-types';
import axios from 'axios';
import { connect } from 'react-redux';

const Welcome = props => (
  <div className="app__welcome">
    <p className="app__welcome-text">Welcome, {props.username}</p>
    <button onClick={() => props.testAuth()}>Test</button>
  </div>
);

Welcome.propTypes = {
  username: PropTypes.string.isRequired,
  testAuth: PropTypes.func.isRequired,
};

const mapStateToProps = state => ({
  username: state.username,
});

const mapDispatchToProps = () => ({
  testAuth: () => {
    axios.get('/api/auth/test', {
      headers: { Authorization: localStorage.getItem('jwt') },
    })
      .then((response) => {
        console.log(response.data);
        // if (message.status !== 'error') {
        //   localStorage.setItem('jwt', response.headers.authorization);
        //   dispatch(setState({ username: message.username }));
        // } else {
        //   alert(message.text);
        // }
      });
  },
});

export default connect(mapStateToProps, mapDispatchToProps)(Welcome);
