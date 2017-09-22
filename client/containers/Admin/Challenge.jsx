import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { getStats } from '../../api/statistic';
import { fethPresets } from '../../api/presets';
import Statistic from '../../components/Statistic';

class AdminChallengeContainer extends Component {
  static propTypes = {
    match: PropTypes.shape({
      params: PropTypes.object,
    }).isRequired,
  };

  state = {
    games: [],
    presets: [],
  };

  componentDidMount() {
    const params = { challenge: this.props.match.params.id };

    getStats(params)
      .then(games => this.setState({ games }));
    fethPresets(params)
      .then(presets => this.setState({ presets }));
  }

  render() {
    return (
      <div>
        <Statistic data={this.state.games} />
      </div>
    );
  }
}

export default AdminChallengeContainer;
