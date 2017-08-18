import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
// import { setState } from '../actions';
import Login from './Login';
import Welcome from './Welcome';

const App = props => (
  <div className="app">
    {props.username ? <Welcome /> : <Login />}
  </div>
);
App.propTypes = {
  username: PropTypes.string,
};
App.defaultProps = {
  username: null,
};

const mapStateToProps = state => ({
  username: state.username,
});
const AppContainer = connect(mapStateToProps)(App);

export default AppContainer;
