export const FETCH_GAME_REQUEST = 'REVEAL_SQUARE_REQUEST';
export const FETCH_GAME_SUCCESS = 'REVEAL_SQUARE_SUCCESS';
export const FETCH_GAME_FAILURE = 'REVEAL_SQUARE_FAILURE';

export const fetchGameRequest = (x, y) => ({
  type: REVEAL_SQUARE_REQUEST,
  payload: { x, y },
});

export const fetchGameSuccess = square => ({
  type: REVEAL_SQUARE_SUCCESS,
  payload: square,
});

export const fetchGameFailure = error => ({
  error,
  type: REVEAL_SQUARE_FAILURE,
});