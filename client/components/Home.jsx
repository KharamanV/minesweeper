import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import Welcome from './Welcome';

const Home = props =>
  (props.auth ? <Welcome /> : (
    <div>
      Please, <Link
        className="app__nav-link"
        to="/login"
      >sign in
      </Link> or <Link
        className="app__nav-link"
        to="/register"
      >register
      </Link>
    </div>
  ));

Home.propTypes = {
  auth: PropTypes.bool.isRequired,
};

const mapStateToProps = state => ({
  auth: state.isAuthenticated,
});

export default connect(mapStateToProps)(Home);
