import React from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';

const AdminStage = ({ data }) => (
  <div>
    {data.width}x{data.height} mines: {data.minesCount}

    <Link to={`/admin/stages/${data._id}/edit`}>
      Edit
    </Link>

    <span>Games played: {data.gamesCount}</span>
    <span>Players: {data.playersCount}</span>
    <span>Last game: {JSON.stringify(data.lastGame)}</span>
  </div>
);

AdminStage.propTypes = { data: PropTypes.shape().isRequired };

export default AdminStage;
