import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { getStats, getStagesStats } from '../../api/statistic';
import Statistic from '../../components/Statistic';
import AdminStage from '../../components/Admin/Stage';

class AdminChallengeContainer extends Component {
  static propTypes = {
    match: PropTypes.shape({
      params: PropTypes.object,
    }).isRequired,
  };

  state = {
    games: [],
    stages: [],
  };

  componentDidMount() {
    const challengeId = this.props.match.params.id;

    getStats({ challenge: challengeId })
      .then(games => this.setState({ games }));
    getStagesStats(challengeId)
      .then(stages => this.setState({ stages }));
  }

  render() {
    const { games, stages } = this.state;

    return (
      <div>
        {stages.map(stage => <AdminStage data={stage} key={stage._id} />)}

        <Statistic data={games} />
      </div>
    );
  }
}

export default AdminChallengeContainer;
