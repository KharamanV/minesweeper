export const FETCH_GAME_REQUEST = 'FETCH_GAME_REQUEST';
export const FETCH_GAME_SUCCESS = 'FETCH_GAME_SUCCESS';
export const FETCH_GAME_FAILURE = 'FETCH_GAME_FAILURE';
export const REVEAL_SQUARE_REQUEST = 'REVEAL_SQUARE_REQUEST';
export const REVEAL_SQUARE_SUCCESS = 'REVEAL_SQUARE_SUCCESS';
export const REVEAL_SQUARE_FAILURE = 'REVEAL_SQUARE_FAILURE';

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

export const revealSquareRequest = (x, y) => ({
  type: REVEAL_SQUARE_REQUEST,
  payload: { x, y },
});

export const revealSquareSuccess = square => ({
  type: REVEAL_SQUARE_SUCCESS,
  payload: square,
});

export const revealSquareFailure = error => ({
  error,
  type: REVEAL_SQUARE_FAILURE,
});
