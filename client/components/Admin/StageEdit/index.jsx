import React from 'react';
import PropTypes from 'prop-types';

const StageEdit = ({ data, onChange, onSubmit }) => (
  <div>
    <form onSubmit={onSubmit}>
      <div>
        <label htmlFor="width">Width:</label>
        <input
          type="text"
          name="width"
          onChange={onChange}
          value={data.width}
          id="width"
        />

      </div>

      <div>
        <label htmlFor="height">height:</label>
        <input
          type="number"
          name="height"
          onChange={onChange}
          value={data.height}
          id="height"
        />

      </div>

      <div>
        <label htmlFor="mines-count">Mines amount:</label>
        <input
          type="text"
          name="minesCount"
          onChange={onChange}
          value={data.minesCount}
          id="mines-count"
        />
      </div>

      <div>
        <label htmlFor="reward-multiplier">Reward multiplier:</label>
        <input
          type="number"
          name="rewardMultiplier"
          onChange={onChange}
          value={data.rewardMultiplier}
          id="reward-multiplier"
        />
      </div>

      <div>
        <label htmlFor="pat-chance">Chance of pat situation:</label>
        <input
          type="number"
          name="patChance"
          onChange={onChange}
          value={data.patChance}
          id="pat-chance"
        />
      </div>

      <button type="submit">OK</button>
    </form>
  </div>
);

StageEdit.propTypes = {
  data: PropTypes.shape().isRequired,
  onChange: PropTypes.func.isRequired,
  onSubmit: PropTypes.func.isRequired,
};

export default StageEdit;
