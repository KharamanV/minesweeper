/* eslint-disable no-alert, no-console */
import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';

const Welcome = props => (
  <div className="app__welcome">
    <p className="app__welcome-text">Welcome, {props.username}</p>
  </div>
);

Welcome.propTypes = {
  username: PropTypes.string.isRequired,
};

const mapStateToProps = state => ({
  username: state.username,
});

export default connect(mapStateToProps)(Welcome);
