/* eslint-disable no-alert, no-console, react/forbid-prop-types, react/no-unused-prop-types */

import React from 'react';
import PropTypes from 'prop-types';
import axios from 'axios';
import { connect } from 'react-redux';
import CSSModules from 'react-css-modules';
import { removePreset, updatePreset, addPreset } from '../actions';
import styles from '../styles/user.css';

class Preset extends React.Component {
  constructor(props) {
    super(props);
    this.state = props.preset ? {
      name: props.preset.name,
      width: props.preset.width,
      height: props.preset.height,
      minesCount: props.preset.minesCount,
      rewardMultiplier: props.preset.rewardMultiplier,
    } : {
      name: '',
      width: '',
      height: '',
      minesCount: '',
      rewardMultiplier: '',
    };
  }

  handleHeight(e) {
    this.setState({ height: e.target.value });
  }

  handleWidth(e) {
    this.setState({ width: e.target.value });
  }

  handleName(e) {
    this.setState({ name: e.target.value });
  }

  handleMines(e) {
    this.setState({ minesCount: e.target.value });
  }

  handleMultiplier(e) {
    this.setState({ rewardMultiplier: e.target.value });
  }

  handleSave() {
    if (Object.values(this.state).findIndex(value => value !== '') === -1) {
      alert('Fill all the fields');
    } else if (this.props.preset) {
      this.props.save({
        id: this.props.preset.id,
        ...this.state,
      });
    } else {
      this.props.create(this.state);
    }
  }

  render() {
    return (
      <li styleName="user">
        <p styleName="id">{this.props.preset ? this.props.preset.id : 'New preset:'}</p>
        <input
          type="text"
          styleName="input"
          value={this.state.name}
          onChange={e => this.handleName(e)}
        />
        <input
          type="number"
          styleName="input-small"
          value={this.state.width}
          onChange={e => this.handleWidth(e)}
        />
        <input
          type="number"
          styleName="input-small"
          value={this.state.height}
          onChange={e => this.handleHeight(e)}
        />
        <input
          step="1"
          type="number"
          styleName="input-small"
          value={this.state.minesCount}
          onChange={e => this.handleMines(e)}
        />
        <input
          type="number"
          styleName="input-small"
          value={this.state.rewardMultiplier}
          onChange={e => this.handleMultiplier(e)}
        />
        <div styleName="column">
          <button
            styleName="user-button"
            onClick={() => this.handleSave()}
          >
            Save
          </button>
        </div>
        <div styleName="column">
          <button
            styleName="user-button"
            onClick={this.props.preset
              ? () => this.props.remove(this.props.preset.id)
              : () => this.props.cancel()
            }
          >
            Remove
          </button>
        </div>
      </li>

    );
  }
}

Preset.propTypes = {
  preset: PropTypes.shape({
    id: PropTypes.string.isRequired,
    name: PropTypes.string.isRequired,
    width: PropTypes.number.isRequired,
    height: PropTypes.number.isRequired,
    minesCount: PropTypes.number.isRequired,
    rewardMultiplier: PropTypes.number.isRequired,
  }),
  cancel: PropTypes.func,
  remove: PropTypes.func.isRequired,
  save: PropTypes.func.isRequired,
  create: PropTypes.func.isRequired,
};

Preset.defaultProps = {
  preset: null,
  cancel: null,
};

const mapDispatchToProps = (dispatch, ownProps) => ({
  remove: (id) => {
    axios.post('/api/games/presets/remove', { id })
      .then((response) => {
        alert(response.statusText);
        dispatch(removePreset(id));
      })
      .catch(err => alert(err.response.statusText));
  },
  save: (preset) => {
    axios.post('/api/games/presets/update', preset)
      .then((response) => {
        alert(response.statusText);
        dispatch(updatePreset(preset));
      })
      .catch(err => alert(err.response.statusText));
  },
  create(preset) {
    axios.post('/api/games/presets/add', preset)
      .then((response) => {
        const message = response.data;
        ownProps.cancel();
        dispatch(addPreset(message));
      })
      .catch(err => alert(err.response.statusText));
  },
});

export default connect(null, mapDispatchToProps)(CSSModules(Preset, styles));
