/* eslint-disable */
import {
  FETCH_GAME_REQUEST,
  FETCH_GAME_SUCCESS,
  FETCH_GAME_FAILURE,
  REVEAL_SQUARE_SUCCESS,
  REVEAL_SQUARE_FAILURE,
} from '../actions/game';
import { createBoard } from '../utils/board';

let squareId = 0;

export default (state = {}, { type, payload }) => {
  switch (type) {
    case FETCH_GAME_REQUEST: {
      return { ...state, isFetching: true };
    }
    case FETCH_GAME_SUCCESS: {
      const { width, height, visitedSquares } = payload;
      const board = createBoard({ width, height, visitedSquares });

      return {
        ...state,
        board,
        isFetching: false,
        isOver: false,
      };
    }
    case FETCH_GAME_FAILURE: {
      return { ...state, isFetching: false };
    }
    case REVEAL_SQUARE_SUCCESS: {
      const board = [...state.board];
      const {
        x,
        y,
        adjacentMinesCount,
        isMine,
        revealedSquares,
        isWon = false,
      } = payload;

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

      return {
        ...state,
        board,
        isWon,
        isOver: isMine || isWon,
      };
    }
    case REVEAL_SQUARE_FAILURE:
    default:
      return state;
  }
};
