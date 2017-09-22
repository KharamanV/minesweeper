import React from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';

const AdminChallenge = ({ data }) => (
  <div>
    <Link to={`/admin/challenges/${data._id}`}>
      {data.name}
    </Link>

    <Link to={`/admin/challenges/${data._id}/edit`}>
      Edit
    </Link>

    <span>Games played: {data.gamesCount}</span>
    <span>Players: {data.playersCount}</span>
    <span>Last game: {JSON.stringify(data.lastGame)}</span>

    <button>Remove</button>
    <hr />
  </div>
);

AdminChallenge.propTypes = {
  data: PropTypes.shape({
    _id: PropTypes.string,
    name: PropTypes.string,
  }),
};

AdminChallenge.defaultProps = { data: {} };

export default AdminChallenge;
