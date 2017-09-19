import React from 'react';
import PropTypes from 'prop-types';

const SelectBox = ({ data, title, onChange }) => (
  <select onChange={onChange}>
    <option value="">Select {title}</option>

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
  title: PropTypes.string.isRequired,
  onChange: PropTypes.func.isRequired,
};

SelectBox.defaultProps = { data: [] };

export default SelectBox;
