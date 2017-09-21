import React, { Component } from 'react';
import PropTypes from 'prop-types';
import Statistic from '../../components/Statistic';
import { getStats } from '../../api/statistic';

class AdminChallengesContainer extends Component {
  static propTypes = {
    match: PropTypes.shape({
      params: PropTypes.object,
    }).isRequired,
  };

  state = { games: [] };

  componentDidMount() {
    getStats({ challenge: this.props.match.params.id })
      .then(games => this.setState({ games }));
  }

  render() {
    return <Statistic data={this.state.games} />;
  }
}

export default AdminChallengesContainer;
