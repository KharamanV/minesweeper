import React from 'react';
import PropTypes from 'prop-types';

const ChallengeEdit = ({ data, onChange, onSubmit }) => (
  <div>
    <form onSubmit={onSubmit}>
      <div>
        <label htmlFor="name">Name:</label>
        <input type="text" name="name" onChange={onChange} value={data.name} id="name" />
      </div>

      <div>
        <label htmlFor="bet">Bet:</label>
        <input type="number" name="bet" onChange={onChange} value={data.bet} id="bet" />
      </div>

      <div>
        {data.presets.map(preset => (
          <div>
            {preset.width}x{preset.height};
            mines = {preset.minesCount};
            reward = {preset.rewardMultiplier}
          </div>
        ))}
      </div>

      <button type="submit">OK</button>
    </form>
  </div>
);

ChallengeEdit.propTypes = {
  data: PropTypes.shape({
    name: PropTypes.string,
    presets: PropTypes.array,
  }).isRequired,
  onChange: PropTypes.func.isRequired,
  onSubmit: PropTypes.func.isRequired,
};

export default ChallengeEdit;
