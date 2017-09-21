/* eslint-disable */
import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import {
  BrowserRouter as Router,
  Route,
  Switch,
} from 'react-router-dom';
import queryString from 'query-string';
import CSSModules from 'react-css-modules';
import { setAuth } from '../../actions';
import Home from '../Home';
import Panel from '../Panel';
import Login from '../Login';
import Register from '../Register';
import Profile from '../Profile';
import Header from '../Header/index';
import ChallengesContainer from '../../containers/Challenges';
import AdminChallengesContainer from '../../containers/Admin/Challenges';
import ChallengePage from '../../containers/ChallengePage';
import Statistic from '../../containers/Statistic';
import StatisticDetail from '../../containers/StatisticDetail';
import request from '../../api';
import styles from './styles.css';
import Challenge from '../Challenge';
import AdminChallenge from '../Admin/Challenge';
import ChallengeEditContainer from '../../containers/Admin/ChallengeEdit';

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

  render() {
    return (
      <Router>
        <div className="app">
          <Header />
          <Switch>
            <Route exact path="/" component={Home} />
            <Route exact path="/admin" component={Panel} />
            <Route
              exact
              path="/admin/challenges"
              render={() => <ChallengesContainer component={AdminChallenge} />}
            />
            <Route
              exact
              path="/admin/challenges/:id"
              component={AdminChallengesContainer}
            />
            <Route path="/admin/challenges/:id/edit" component={ChallengeEditContainer} />
            <Route
              exact
              path="/challenges"
              render={() => <ChallengesContainer component={Challenge} />}
            />
            <Route path="/challenges/:id" component={ChallengePage} />
            <Route exact path="/stats" component={Statistic} />
            <Route path="/stats/:id" component={StatisticDetail} />
            <Route path="/login" component={Login} />
            <Route path="/Register" component={Register} />
            <Route path="/profile" component={Profile} />
          </Switch>
        </div>
      </Router>
    );
  }
}

App.propTypes = {
  setAuthenticated: PropTypes.func.isRequired,
};

const mapStateToProps = state => ({
  auth: state.auth.isAuthenticated,
});

const mapDispatchToProps = dispatch => ({
  setAuthenticated(auth) {
    dispatch(setAuth(auth));
  },
});

export default connect(mapStateToProps, mapDispatchToProps)(
  CSSModules(App, styles),
);
