import React from 'react';
import PropTypes from 'prop-types';

const SelectBox = ({ data, caption, onChange }) => (
  <select onChange={onChange}>
    <option value="">{caption}</option>

    {data.map(option => (
      <option
        key={option._id}
        value={option._id}
      >
        {option.value}
      </option>
    ))}
  </select>
);

SelectBox.propTypes = {
  data: PropTypes.arrayOf(PropTypes.object).isRequired,
  caption: PropTypes.string.isRequired,
  onChange: PropTypes.func.isRequired,
};

SelectBox.defaultProps = { data: [] };

export default SelectBox;
