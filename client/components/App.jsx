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
import CSSModules from 'react-css-modules';
import { setAuth } from '../actions';
import Home from './Home';
import Panel from './Panel';
import Login from './Login';
import Register from './Register';
import Game from '../containers/Game';
import request from '../api';
import styles from '../styles/index.css';

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
          <nav styleName="navigation">
            <Link styleName="link" to="/">Home</Link>
            {this.props.auth && <Link styleName="link" to="/admin">Admin</Link>}
            {this.props.auth &&
              <Link styleName="link" onClick={() => this.logout()} to="/">Logout</Link>
            }
          </nav>
          <Switch>
            <Route exact path="/" component={Home} />
            <Route path="/admin" component={Panel} />
            <Route path="/play" component={Game} />
            <Route path="/login" component={Login} />
            <Route path="/Register" component={Register} />
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

export default connect(mapStateToProps, mapDispatchToProps)(CSSModules(App, styles));
