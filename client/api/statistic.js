import request from '.';

export const getStats = params => (
  request('/api/stats', { params })
    .then(({ data }) => data)
);

export const getChallengesStats = () => (
  request('/api/stats/challenges')
    .then(({ data }) => data)
);

export const getStagesStats = challengeId => (
  request(`/api/stats/challenges/${challengeId}`)
    .then(({ data }) => data)
);

export const getStat = statId => (
  request(`/api/stats/${statId}`)
    .then(({ data }) => data)
);
