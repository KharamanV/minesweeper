import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { fetchChallenges } from '../api/challenges';

class ChallengesContainer extends Component {
  static propTypes = { component: PropTypes.func.isRequired };

  state = { challenges: [] };

  componentDidMount() {
    fetchChallenges()
      .then(challenges => this.setState({ challenges }));
  }

  render() {
    const { component: Challenge } = this.props;

    return (
      <div>
        {this.state.challenges.map(challenge => (
          <Challenge
            data={challenge}
            key={challenge._id}
          />
        ))}
      </div>
    );
  }
}

export default ChallengesContainer;
