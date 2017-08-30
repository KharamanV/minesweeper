export const FETCH_GAME_REQUEST = 'FETCH_GAME_REQUEST';
export const FETCH_GAME_SUCCESS = 'FETCH_GAME_SUCCESS';
export const FETCH_GAME_FAILURE = 'FETCH_GAME_FAILURE';

export const fetchGameRequest = presetId => ({
  type: FETCH_GAME_REQUEST,
  payload: presetId,
});

export const fetchGameSuccess = game => ({
  type: FETCH_GAME_SUCCESS,
  payload: game,
});

export const fetchGameFailure = error => ({
  error,
  type: FETCH_GAME_FAILURE,
});
