import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import Login from './Login';
import Welcome from './Welcome';

const Home = props =>
  (props.auth ? <Welcome /> : <Login />);

Home.propTypes = {
  auth: PropTypes.bool,
};

Home.defaultProps = {
  auth: false,
};

const mapStateToProps = state => ({
  auth: state.isAuthenticated,
});

export default connect(mapStateToProps)(Home);
