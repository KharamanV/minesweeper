import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import Login from './Login';
import Welcome from './Welcome';

const Home = props =>
  (props.username ? <Welcome /> : <Login />);

Home.propTypes = {
  username: PropTypes.string,
};
Home.defaultProps = {
  username: null,
};

const mapStateToProps = state => ({
  username: state.username,
});
const HomeContainer = connect(mapStateToProps)(Home);

export default HomeContainer;
