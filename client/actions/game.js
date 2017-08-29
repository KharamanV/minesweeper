export const FETCH_GAME_REQUEST = 'FETCH_GAME_REQUEST';
export const FETCH_GAME_SUCCESS = 'FETCH_GAME_SUCCESS';
export const FETCH_GAME_FAILURE = 'FETCH_GAME_FAILURE';

export const fetchGame = () => ({ type: FETCH_GAME_REQUEST });

export const fetchGameSuccess = board => ({
  type: FETCH_GAME_SUCCESS,
  payload: board,
});

export const fetchGameFailure = error => ({
  error,
  type: FETCH_GAME_FAILURE,
});
