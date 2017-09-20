import React from 'react';
import PropTypes from 'prop-types';
import moment from 'moment';
import Board from '../Board';

const StatisticDetail = ({ data }) => (
  <div>
    <ul>
      <li>{data.isWon ? 'Win' : 'Lose'}</li>
      <li>Size: {data.width}x{data.heigt}</li>
      <li>Clicks: {data.clicks}</li>
      <li>Start date: {moment(data.startDate).format('LL')}</li>
      <li>Time: {data.time}s</li>
      <li>User: {data.user.username}</li>
    </ul>

    <Board data={data.board} disabled />
  </div>
);

StatisticDetail.propTypes = {
  data: PropTypes.shape({
    board: PropTypes.array,
  }).isRequired,
};

export default StatisticDetail;
