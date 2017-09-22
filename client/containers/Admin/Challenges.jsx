import React, { Component } from 'react';
import { getChallengesStats } from '../../api/statistic';
import AdminChallenge from '../../components/Admin/Challenge';

class AdminChallengesContainer extends Component {
  state = { challenges: [] };

  componentDidMount() {
    getChallengesStats()
      .then(challenges => this.setState({ challenges }));
  }

  render() {
    const { challenges } = this.state;

    return (
      <div>
        {challenges.map(challenge => (
          <AdminChallenge data={challenge} key={challenge._id} />
        ))}
      </div>
    );
  }
}

export default AdminChallengesContainer;
