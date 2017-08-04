import {
  REVEAL_SQUARE_SUCCESS,
  REVEAL_SQUARE_FAILURE,
} from '../actions/board';

export default (state = [], { type, payload }) => {
  switch (type) {
    case REVEAL_SQUARE_SUCCESS: {
      const { square } = payload;
      const { x, y } = square;
      const board = [...state];

      board[x][y] = square;

      return board;
    }
    case REVEAL_SQUARE_FAILURE:
    default:
      return state;
  }
};
