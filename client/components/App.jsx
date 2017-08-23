import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import {
  BrowserRouter as Router,
  Route,
  Link,
  Switch,
} from 'react-router-dom';
import Home from './Home';
import Panel from './Panel';

const App = props => (
  <Router>
    <div className="app">
      <nav className="app__nav">
        <Link className="app__nav-link" to="/">Home</Link>
        {props.username && <Link className="app__nav-link" to="/admin">Admin</Link>}
      </nav>
      <Switch>
        <Route exact path="/" component={Home} />
        <Route path="/admin" component={Panel} />
      </Switch>
    </div>
  </Router>
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

export default connect(mapStateToProps)(App);
