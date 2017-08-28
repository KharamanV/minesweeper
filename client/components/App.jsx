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
import { setUsername, setAuth } from '../actions';
import Home from './Home';
import Panel from './Panel';
import { request } from '../api';
import Game from '../containers/Game';

class App extends React.Component {
  componentWillMount() {
    const token = localStorage.getItem('jwt');
    if (token) {
      request.get('/api/auth/')
        .then((response) => {
          const message = response.data;
          if (message.status === 'error') {
            console.log(message.text);
          } else {
            this.props.setAuthenticated(true);
            this.props.setName(message.username);
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
  setName: PropTypes.func.isRequired,
  setAuthenticated: PropTypes.func.isRequired,
};

const mapStateToProps = state => ({
  auth: state.isAuthenticated,
});

const mapDispatchToProps = dispatch => ({
  setName(username) {
    dispatch(setUsername(username));
  },
  setAuthenticated(auth) {
    dispatch(setAuth(auth));
  },
});

export default connect(mapStateToProps, mapDispatchToProps)(App);
