import React, { Component } from 'react';
import { getStats } from '../api/statistic';
import { fethPresets } from '../api/presets';
import Statistic from '../components/Statistic';
import SelectBox from '../components/SelectBox';

class StatisticContainer extends Component {
  state = {
    stats: [],
    presets: [],
  };

  componentDidMount() {
    getStats()
      .then(stats => this.setState({ stats }));
    fethPresets()
      .then(this.handlePresets);
  }

  onPresetChange = ({ target }) => {
    const presetId = target.value;
    const query = presetId && { preset: presetId };

    return getStats(query)
      .then(stats => this.setState({ stats }));
  };

  handlePresets = (data) => {
    const presets = data.map(({ _id, width, height, minesCount }) => {
      const value = `Size: ${width}x${height} Mines:${minesCount}`;

      return { _id, value };
    });

    this.setState({ presets });
  };

  render() {
    const { stats, presets } = this.state;

    return (
      <div>
        <SelectBox
          caption="All stages"
          data={presets}
          onChange={this.onPresetChange}
        />

        <Statistic data={stats} />
      </div>
    );
  }
}

export default StatisticContainer;
