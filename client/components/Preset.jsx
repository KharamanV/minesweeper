/* eslint-disable no-alert, no-console, react/forbid-prop-types */

import React from 'react';
import PropTypes from 'prop-types';
import axios from 'axios';
import { connect } from 'react-redux';
import CSSModules from 'react-css-modules';
import { removePreset, updatePreset } from '../actions';
import styles from '../styles/user.css';

class Preset extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      name: props.name,
      width: props.width,
      height: props.height,
      mines: props.mines,
      multiplier: props.multiplier,
    };
  }

  setHeight(e) {
    this.setState({ height: e.target.value });
  }

  setWidth(e) {
    this.setState({ width: e.target.value });
  }

  setName(e) {
    this.setState({ name: e.target.value });
  }

  setMines(e) {
    this.setState({ mines: e.target.value });
  }

  setMultiplier(e) {
    this.setState({ multiplier: e.target.value });
  }

  render() {
    return (
      <li styleName="user">
        <p styleName="id">{this.props.id}</p>
        <input
          type="text"
          styleName="column"
          value={this.state.name}
          onChange={e => this.setName(e)}
        />
        <input
          pattern="[0-9]"
          type="text"
          styleName="column-small"
          value={this.state.width}
          onChange={e => this.setWidth(e)}
        />
        <input
          type="text"
          styleName="column-small"
          value={this.state.height}
          onChange={e => this.setHeight(e)}
        />
        <input
          type="text"
          styleName="column-small"
          value={this.state.mines}
          onChange={e => this.setMines(e)}
        />
        <input
          type="text"
          styleName="column-small"
          value={this.state.multiplier}
          onChange={e => this.setMultiplier(e)}
        />
        <div styleName="column">
          <button
            styleName="user-button"
            onClick={() => this.props.save({
              id: this.props.id,
              ...this.state,
            })}
          >
            Save
          </button>
        </div>
        <div styleName="column">
          <button
            styleName="user-button"
            onClick={() => this.props.remove(this.props.id)}
          >
            Remove
          </button>
        </div>
      </li>

    );
  }
}

Preset.propTypes = {
  id: PropTypes.string.isRequired,
  name: PropTypes.string.isRequired,
  width: PropTypes.number.isRequired,
  height: PropTypes.number.isRequired,
  mines: PropTypes.number.isRequired,
  multiplier: PropTypes.number.isRequired,
  remove: PropTypes.func.isRequired,
  save: PropTypes.func.isRequired,
};

const mapStateToProps = (state, ownProps) => ({
  name: ownProps.preset.name,
  width: ownProps.preset.width,
  height: ownProps.preset.height,
  mines: ownProps.preset.minesCount,
  multiplier: ownProps.preset.rewardMultiplier,
  id: ownProps.preset.id,
});

const mapDispatchToProps = dispatch => ({
  remove: (id) => {
    axios.post('/api/games/presets/remove', { id }).then((response) => {
      const message = response.data;
      if (message.status !== 'error') {
        dispatch(removePreset(id));
      } else {
        alert(message.text);
      }
    });
  },
  save: (user) => {
    axios.post('/api/games/presets/update', user).then((response) => {
      const message = response.data;
      if (message.status !== 'error') {
        alert(message.status);
        dispatch(updatePreset(user));
      } else {
        alert(message.text);
      }
    });
  },
});

export default connect(mapStateToProps, mapDispatchToProps)(CSSModules(Preset, styles));
