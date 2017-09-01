import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import CSSModules from 'react-css-modules';
import { Link } from 'react-router-dom';
import { setAuth } from '../actions';
import styles from '../styles/index.css';

class Header extends React.Component {
  logout() {
    localStorage.removeItem('jwt');
    this.props.setAuthenticated(false);
  }

  render() {
    return (
      <nav styleName="navigation">
        <Link styleName="link" to="/">Home</Link>
        {
          this.props.auth &&
            (
              <div>
                <Link styleName="link" to="/play">Play</Link>
                <Link styleName="link" to="/profile">Profile</Link>
                <Link styleName="link" to="/admin">Admin</Link>
                <Link styleName="link" onClick={() => this.logout()} to="/">Logout</Link>
              </div>
            )
        }
      </nav>
    );
  }
}

Header.propTypes = {
  auth: PropTypes.bool.isRequired,
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

export default connect(mapStateToProps, mapDispatchToProps)(CSSModules(Header, styles));
