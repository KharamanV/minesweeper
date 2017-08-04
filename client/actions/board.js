export const REVEAL_SQUARE_REQUEST = 'REVEAL_SQUARE_REQUEST';
export const REVEAL_SQUARE_SUCCESS = 'REVEAL_SQUARE_SUCCESS';
export const REVEAL_SQUARE_FAILURE = 'REVEAL_SQUARE_FAILURE';

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