import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { getChallenge, playChallenge, withdrawChallenge } from '../api/challenges';
import ChallengePage from '../components/ChallengePage';

class Challenges extends Component {
  static propTypes = {
    match: PropTypes.shape({ params: PropTypes.object }),
  };

  static defaultProps = { match: {} }

  state = {
    challenge: null,
    reward: 0,
  };

  componentDidMount() {
    getChallenge(this.props.match.params.id)
      .then(challenge => this.setState({ challenge }));
  }

  onGame = () => (
    playChallenge(this.props.match.params.id)
      .then(({ activeStage, gameId }) => this.setState({
        challenge: {
          ...this.state.challenge,
          isStageWon: false,
          activeStage,
          gameId,
        },
      }))
  );

  onGameEnd = (isStageWon) => {
    const challenge = { ...this.state.challenge, isStageWon };
    const lastStage = this.state.challenge.presets.length - 1;
    const isChallengeComplete = lastStage === this.state.challenge.activeStage;
    const reward = isStageWon
      ? challenge.presets[challenge.activeStage].rewardMultiplier * challenge.bet
      : 0;

    this.setState({
      challenge,
      reward,
      isChallengeComplete,
    });
  }

  onWithdraw = () => (
    withdrawChallenge(this.props.match.params.id)
      .then(() => this.setState({
        challenge: { ...this.state.challenge, activeStage: null, gameId: null },
        reward: 0,
      }))
  );

  render() {
    const { challenge, reward, isChallengeComplete } = this.state;

    return (
      <ChallengePage
        data={challenge}
        onGame={this.onGame}
        reward={reward}
        onGameEnd={this.onGameEnd}
        onWithdraw={this.onWithdraw}
        isComplete={isChallengeComplete}
      />
    );
  }
}

export default Challenges;
