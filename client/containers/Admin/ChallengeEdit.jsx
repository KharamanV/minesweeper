import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { fetchChallenge, editChallenge } from '../../api/challenges';
import ChallengeEdit from '../../components/Admin/ChallengeEdit/index';

class ChallengeEditContainer extends Component {
  static propTypes = {
    match: PropTypes.shape({
      params: PropTypes.object,
    }).isRequired,
  };

  state = { challenge: null };

  componentDidMount() {
    fetchChallenge(this.props.match.params.id)
      .then(challenge => this.setState({ challenge }));
  }

  handleInput = ({ target }) => {
    const challenge = { ...this.state.challenge, [target.name]: target.value };

    this.setState({ challenge });
  };

  handleSubmit = (e) => {
    e.preventDefault();

    const { bet, name } = this.state.challenge;

    editChallenge(this.props.match.params.id, { bet, name });
  }

  render() {
    const { challenge } = this.state;

    return challenge && (
      <ChallengeEdit
        data={challenge}
        onChange={this.handleInput}
        onSubmit={this.handleSubmit}
      />
    );
  }
}

export default ChallengeEditContainer;
