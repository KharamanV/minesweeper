import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { fethPreset, editPreset } from '../../api/presets';
import StageEdit from '../../components/Admin/StageEdit';

class StageEditContainer extends Component {
  static propTypes = {
    match: PropTypes.shape({
      params: PropTypes.object,
    }).isRequired,
  };

  state = { stage: null };

  componentDidMount() {
    fethPreset(this.props.match.params.id)
      .then(stage => this.setState({ stage }));
  }

  handleInput = ({ target }) => {
    const stage = { ...this.state.stage, [target.name]: target.value };

    this.setState({ stage });
  };

  handleSubmit = (e) => {
    e.preventDefault();

    editPreset(this.props.match.params.id, this.state.stage);
  }

  render() {
    const { stage } = this.state;

    return stage && (
      <StageEdit
        data={stage}
        onChange={this.handleInput}
        onSubmit={this.handleSubmit}
      />
    );
  }
}

export default StageEditContainer;
