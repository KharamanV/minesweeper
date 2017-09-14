import { call, put, takeEvery } from 'redux-saga/effects';
import { fetchGame, revealSquare } from '../api/game';
import {
  fetchGameSuccess,
  fetchGameFailure,
  revealSquareSuccess,
  revealSquareFailure,
  FETCH_GAME_REQUEST,
  REVEAL_SQUARE_REQUEST,
} from '../actions/game';

function* fetchGameSaga({ payload }) {
  try {
    const game = yield call(fetchGame, payload);

    yield put(fetchGameSuccess(game));
  } catch (err) {
    yield put(fetchGameFailure(err));
  }
}

function* revealSquareSaga({ payload }) {
  try {
    const { gameId, x, y } = payload;
    const { data } = yield call(revealSquare, gameId, { x, y });

    yield put(revealSquareSuccess(data));
  } catch (err) {
    yield put(revealSquareFailure(err));
  }
}

export default function* () {
  yield takeEvery(FETCH_GAME_REQUEST, fetchGameSaga);
  yield takeEvery(REVEAL_SQUARE_REQUEST, revealSquareSaga);
}
