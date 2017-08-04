import { call, put, takeEvery } from 'redux-saga/effects';
import { fetchGame } from '../api';
import {
  revealSquareSuccess,

} from '../actions/board';

function* fetchGameSaga(action) {
  try {
    const game = yield call(fetchGame, action.payload.gameId);

    yield put(revealSquareSuccess())
  } catch (e) {

  }
}