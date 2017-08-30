import {
  FETCH_GAME_SUCCESS,
  FETCH_GAME_FAILURE,
} from '../actions/game';

export default (state = {}, { type, payload }) => {
  switch (type) {
    case FETCH_GAME_SUCCESS: {
      const board = payload.board.map(row => (
        row.map(() => ({
          isMine: false,
          isRevealed: false,
          isFlagged: false,
          adjacentMinesCount: null,
        }))
      ));

      return { ...payload, board };
    }
    case FETCH_GAME_FAILURE:
    default:
      return state;
  }
};
