/* eslint-disable no-alert, no-console */
import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import request from '../api';
import { setName } from '../actions';

class Welcome extends React.Component {
  componentWillMount() {
    this.props.getName();
  }
  render() {
    return (
      <div className="app__welcome">
        {this.props.name && <p className="app__welcome-text">Welcome, {this.props.name}</p>}
      </div>
    );
  }
}

Welcome.propTypes = {
  name: PropTypes.string,
  getName: PropTypes.func.isRequired,
};

Welcome.defaultProps = {
  name: '',
};

const mapStateToProps = state => ({
  name: state.name,
});

const mapDispatchToProps = dispatch => ({
  getName() {
    console.log(localStorage.getItem('jwt'));
    request.get('/api/auth/name')
      .then((response) => {
        if (response.status !== 200) {
          console.log(response.statusText);
        } else {
          dispatch(setName(response.data.name));
        }
      });
  },
});

export default connect(mapStateToProps, mapDispatchToProps)(Welcome);
