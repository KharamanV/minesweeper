/* eslint-disable no-alert, no-console */
import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
// import { request } from '../api';

const Welcome = props => (
  <div className="app__welcome">
    <p className="app__welcome-text">Welcome, {props.username}</p>
    {/* <button onClick={() => props.testAuth()}>Test</button> */}
  </div>
);

Welcome.propTypes = {
  username: PropTypes.string,
  // testAuth: PropTypes.func.isRequired,
};

Welcome.defaultProps = {
  username: '',
};

const mapStateToProps = state => ({
  username: state.username,
});

const mapDispatchToProps = () => ({
  // testAuth: () => {
  //   request.get('/api/auth/')
  //     .then((response) => {
  //       console.log(response.data);
  //     });
  // },
});

export default connect(mapStateToProps, mapDispatchToProps)(Welcome);
