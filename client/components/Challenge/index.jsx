import React from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';

const Challenge = ({ data }) => (
  <div>
    <Link to={`/challenges/${data._id}`}>
      {data.name}
    </Link>
  </div>
);

Challenge.propTypes = {
  data: PropTypes.shape({
    name: PropTypes.string,
  }),
};

Challenge.defaultProps = { data: {} };

export default Challenge;
