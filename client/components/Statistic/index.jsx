import React from 'react';
import PropTypes from 'prop-types';
import CSSModules from 'react-css-modules';
import moment from 'moment';
import { Link } from 'react-router-dom';
import styles from './styles.css';

const Statistic = ({ data }) => (
  <div>
    {data.length
      ? (
        <div>
          <ul styleName="title-list">
            <li>#</li>
            <li>User</li>
            <li>Size</li>
            <li>Time</li>
            <li>Clicks</li>
            <li>Start date</li>
          </ul>

          <div>
            {data.map((stat, index) => (
              <Link
                styleName={`row ${stat.isWon ? 'win' : 'lose'}`}
                key={stat._id}
                to={`/stats/${stat._id}`}
              >
                <span>{index + 1}</span>
                <span>{stat.user.username}</span>
                <span>{stat.width}x{stat.height}</span>
                <span>{stat.time}s</span>
                <span>{stat.clicks}</span>
                <span>{moment(stat.startDate).format('LL')}</span>
              </Link>
            ))}
          </div>
        </div>
      )
      : <h3>There are no stages</h3>
    }
  </div>
);

Statistic.propTypes = { data: PropTypes.arrayOf(PropTypes.object) };
Statistic.defaultProps = { data: [] };

export default CSSModules(Statistic, styles, { allowMultiple: true });
