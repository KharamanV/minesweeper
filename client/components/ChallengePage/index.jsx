/* eslint-disable */
import React from 'react';
import PropTypes from 'prop-types';
import CSSModules from 'react-css-modules';
import Game from '../../containers/Game';
import ChalengeStage from '../ChallengeStage';
import styles from './styles.css';

const ChallengePage = ({ data, onGame, onGameEnd, reward, onWithdraw }) => (
  <div styleName="challenge-page">
    {data && (
      <div>
        <h1>{data.name}</h1>
        <h3>Bet: {data.bet}$</h3>
        <h4>Your reward: {reward}$</h4>

        <div styleName="stages-container">
          Stages: {data.presets.map((stage, index) => (
            <ChalengeStage
              key={stage._id}
              data={stage}
              active={data.gameId && data.activeStage === index}
              succeeded={data.activeStage > index || data.activeStage === index && !data.gameId}
            />
          ))}
        </div>
        <div styleName="game-container">
          {data.gameId && (
            <Game
              gameId={data.gameId}
              onGameEnd={onGameEnd}
            />
          )}
        </div>
        <button styleName="play-button" onClick={onGame}>Play</button>

        {data.isStageWon && <button styleName="withdraw-button" onClick={onWithdraw}>Withdraw</button>}
      </div>
    )}
  </div>
);

ChallengePage.propTypes = {
  data: PropTypes.shape({
    name: PropTypes.string,
    bet: PropTypes.number,
    presets: PropTypes.array,
    activeStage: PropTypes.number,
    gameId: PropTypes.any,
    board: PropTypes.array,
  }),
  reward: PropTypes.number,
  onGame: PropTypes.func.isRequired,
  onWithdraw: PropTypes.func.isRequired,
  onGameEnd: PropTypes.func.isRequired,
};

ChallengePage.defaultProps = { data: null };

export default CSSModules(ChallengePage, styles);
