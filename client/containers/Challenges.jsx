import React, { Component } from 'react';
import { fetchChallenges } from '../api/challenges';
import Challenge from '../components/Challenge';

class ChallengesContainer extends Component {
  state = { challenges: [] };

  componentDidMount() {
    fetchChallenges()
      .then(challenges => this.setState({ challenges }));
  }

  render() {
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