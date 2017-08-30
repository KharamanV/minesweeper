/* eslint-disable no-alert, no-console */
import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import {
  BrowserRouter as Router,
  Route,
  Link,
  Switch,
} from 'react-router-dom';
import queryString from 'query-string';
import { setAuth } from '../actions';
import Home from './Home';
import Panel from './Panel';
import Game from '../containers/Game';
import request from '../api';

class App extends React.Component {
  componentWillMount() {
    const queryToken = queryString.parse(location.search).token;
    if (queryToken) {
      localStorage.setItem('jwt', queryToken);
      window.history.replaceState(null, null, window.location.pathname);
    }
    const token = localStorage.getItem('jwt');
    if (token) {
      request.get('/api/auth/')
        .then((response) => {
          if (response.status !== 200) {
            console.log(response.statusText);
          } else {
            this.props.setAuthenticated(true);
          }
        });
    }
  }

  logout() {
    localStorage.removeItem('jwt');
    this.props.setAuthenticated(false);
  }

  render() {
    return (
      <Router>
        <div className="app">
          <nav className="app__nav">
            <Link className="app__nav-link" to="/">Home</Link>
            {this.props.auth && <Link className="app__nav-link" to="/admin">Admin</Link>}
            {this.props.auth &&
              <Link className="app__nav-link" onClick={() => this.logout()} to="/">Logout</Link>
            }
          </nav>
          <Switch>
            <Route exact path="/" component={Home} />
            <Route path="/admin" component={Panel} />
            <Route path="/play" component={Game} />
          </Switch>
        </div>
      </Router>
    );
  }
}

App.propTypes = {
  auth: PropTypes.bool.isRequired,
  setAuthenticated: PropTypes.func.isRequired,
};

const mapStateToProps = state => ({
  auth: state.isAuthenticated,
});

const mapDispatchToProps = dispatch => ({
  setAuthenticated(auth) {
    dispatch(setAuth(auth));
  },
});

export default connect(mapStateToProps, mapDispatchToProps)(App);
