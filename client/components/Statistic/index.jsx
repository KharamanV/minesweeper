import React from 'react';
import PropTypes from 'prop-types';
import CSSModules from 'react-css-modules';
import moment from 'moment';
import styles from './styles.css';

const Statistic = ({ data }) => (
  <table styleName="stats-table">
    <thead>
      <tr styleName="table-header">
        <th>#</th>
        <th>User</th>
        <th>Size</th>
        <th>Time</th>
        <th>Clicks</th>
        <th>Start date</th>
      </tr>
    </thead>
    <tbody>
      {data.map((stat, index) => (
        <tr
          styleName={`table-row ${stat.isWon ? 'win' : 'lose'}`}
          key={stat._id}
        >
          <td>{index + 1}</td>
          <td>{stat.user.username}</td>
          <td>{stat.width}x{stat.height}</td>
          <td>{stat.time}s</td>
          <td>{stat.clicks}</td>
          <td>{moment(stat.startDate).format('LL')}</td>
        </tr>
      ))}
    </tbody>
  </table>
);

Statistic.propTypes = { data: PropTypes.arrayOf(PropTypes.object) };
Statistic.defaultProps = { data: [] };

export default CSSModules(Statistic, styles, { allowMultiple: true });
