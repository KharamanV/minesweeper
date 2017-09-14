export const FETCH_CHALLENGES_REQUEST = 'FETCH_CHALLENGES_REQUEST';
export const FETCH_CHALLENGES_SUCCESS = 'FETCH_CHALLENGES_SUCCESS';
export const FETCH_CHALLENGES_FAILURE = 'FETCH_CHALLENGES_FAILURE';
export const FETCH_CHALLENGE_REQUEST = 'FETCH_CHALLENGE_REQUEST';
export const FETCH_CHALLENGE_SUCCESS = 'FETCH_CHALLENGE_SUCCESS';
export const FETCH_CHALLENGE_FAILURE = 'FETCH_CHALLENGE_FAILURE';

export const fetchChallengeRequest = challengeId => ({
  type: FETCH_CHALLENGE_REQUEST,
  payload: challengeId,
});

export const fetchChallengeSuccess = challenge => ({
  type: FETCH_CHALLENGE_SUCCESS,
  payload: challenge,
});

export const fetchChallengeFailure = error => ({
  error,
  type: FETCH_CHALLENGE_FAILURE,
});

export const fetchChallengesRequest = () => ({ type: FETCH_CHALLENGES_REQUEST });

export const fetchChallengesSuccess = challenges => ({
  type: FETCH_CHALLENGES_SUCCESS,
  payload: challenges,
});

export const fetchChallengesFailure = error => ({
  error,
  type: FETCH_CHALLENGES_FAILURE,
});
