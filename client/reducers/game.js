import {
  FETCH_GAME_SUCCESS,
  FETCH_GAME_FAILURE,
} from '../actions/game';

export default (state = {}, { type, payload }) => {
  switch (type) {
    case FETCH_GAME_SUCCESS: {
      const { square } = payload;
      const { x, y } = square;
      const board = [...state];

      board[x][y] = square;

      return board;
    }
    case FETCH_GAME_FAILURE:
    default:
      return state;
  }
};
