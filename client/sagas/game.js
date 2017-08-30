import { call, put, takeEvery } from 'redux-saga/effects';
import { fetchGame } from '../api/game';
import {
  fetchGameSuccess,
  fetchGameFailure,
  FETCH_GAME_REQUEST,
} from '../actions/game';

function* fetchGameSaga({ payload }) {
  try {
    const { data: game } = yield call(fetchGame, payload);

    yield put(fetchGameSuccess(game));
  } catch (err) {
    yield put(fetchGameFailure(err));
  }
}

export default function* () {
  yield takeEvery(FETCH_GAME_REQUEST, fetchGameSaga);
}
