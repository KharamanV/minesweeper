import React from 'react';
import PropTypes from 'prop-types';
import CSSModules from 'react-css-modules';
import classNames from 'classnames';
import styles from './styles.css';

const getStyles = state => classNames('stage', state);

const ChallengeStage = ({ data, active, succeeded }) => (
  <div styleName={getStyles({ active, succeeded })}>
    <span>Size: {data.width} x {data.height}; </span>
    <span>Mines count: {data.minesCount}; </span>
    <span>Reward: {data.rewardMultiplier}</span>
  </div>
);

ChallengeStage.propTypes = {
  data: PropTypes.shape({
    width: PropTypes.number,
    height: PropTypes.number,
    rewardMultiplier: PropTypes.number,
    minesCount: PropTypes.number,
  }).isRequired,
  active: PropTypes.bool,
  succeeded: PropTypes.bool,
};

ChallengeStage.defaultProps = {
  active: false,
  succeeded: false,
};

export default CSSModules(ChallengeStage, styles, { allowMultiple: true });
