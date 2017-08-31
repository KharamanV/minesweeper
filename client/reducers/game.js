import {
  FETCH_GAME_REQUEST,
  FETCH_GAME_SUCCESS,
  FETCH_GAME_FAILURE,
  REVEAL_SQUARE_SUCCESS,
  REVEAL_SQUARE_FAILURE,
} from '../actions/game';

let squareId = 0;

export default (state = {}, { type, payload }) => {
  switch (type) {
    case FETCH_GAME_REQUEST: {
      return { ...state, isFetching: true };
    }
    case FETCH_GAME_SUCCESS: {
      const board = payload.board.map(row => (
        row.map(() => {
          squareId += 1;

          return {
            id: squareId,
            isMine: false,
            isRevealed: false,
            isFlagged: false,
            adjacentMinesCount: null,
          };
        })
      ));

      return {
        ...state,
        ...payload,
        board,
        isFetching: false,
        isOver: false,
      };
    }
    case FETCH_GAME_FAILURE: {
      return { ...state, isFetching: false };
    }
    case REVEAL_SQUARE_SUCCESS: {
      const { x, y, adjacentMinesCount, isMine, revealedSquares } = payload;
      const board = [...state.board];

      board[y][x] = {
        ...board[y][x],
        isMine,
        adjacentMinesCount,
        isRevealed: true,
      };

      if (revealedSquares) {
        revealedSquares.forEach((square) => {
          board[square.y][square.x] = {
            ...board[square.y][square.x],
            adjacentMinesCount: square.adjacentMinesCount,
            isRevealed: true,
          };
        });
      }

      return { ...state, board, isOver: isMine };
    }
    case REVEAL_SQUARE_FAILURE:
    default:
      return state;
  }
};
