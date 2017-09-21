import request from '.';

export const fetchChallenges = () => (
  request('/api/challenges')
    .then(({ data }) => data)
);

export const fetchChallenge = challengeId => (
  request(`/api/challenges/${challengeId}`)
    .then(({ data }) => data)
);

export const getChallengeStatus = challengeId => (
  request(`/api/challenges/${challengeId}/user`)
    .then(({ data }) => data)
);

export const getChallenge = async (challengeId) => {
  const challenge = await fetchChallenge(challengeId);
  const status = await getChallengeStatus(challengeId);

  return { ...challenge, ...status };
};

export const playChallenge = challengeId => (
  request.post(`/api/challenges/${challengeId}/play`)
    .then(({ data }) => data)
);

export const withdrawChallenge = challengeId => (
  request.post(`/api/challenges/${challengeId}/withdraw`)
    .then(({ data }) => data)
);

export const editChallenge = (challengeId, challenge) => (
  request.put(`/api/challenges/${challengeId}`, { challenge })
    .then(({ data }) => data)
);
