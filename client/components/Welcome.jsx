/* eslint-disable no-alert, no-console */
import React from 'react';
import request from '../api';

class Welcome extends React.Component {
  constructor() {
    super();
    this.state = {};
  }

  componentWillMount() {
    request.get('/api/auth/name')
      .then((response) => {
        if (response.status !== 200) {
          console.log(response.statusText);
        } else {
          this.setState({ name: response.data.name });
        }
      });
  }
  render() {
    return (
      <div className="app__welcome">
        {this.state.name && <p className="app__welcome-text">Welcome, {this.state.name}</p>}
      </div>
    );
  }
}

export default Welcome;
