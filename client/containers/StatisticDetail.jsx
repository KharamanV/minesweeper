import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { createBoard } from '../utils/board';
import { getStat } from '../api/statistic';
import StatisticDetail from '../components/StatisticDetail';

class StatisticDetailContainer extends Component {
  static propTypes = {
    match: PropTypes.shape({
      params: PropTypes.object,
    }).isRequired,
  };

  state = { stat: null };

  // TODO: Memoize board
  componentDidMount() {
    getStat(this.props.match.params.id)
      .then(stat => ({
        ...stat,
        board: createBoard({
          width: stat.width,
          height: stat.height,
          visitedSquares: stat.visitedSquares,
        }),
      }))
      .then(stat => this.setState({ stat }));
  }

  render() {
    const { stat } = this.state;

    return stat && <StatisticDetail data={stat} />;
  }
}

export default StatisticDetailContainer;
