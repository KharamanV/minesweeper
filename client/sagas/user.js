/* eslint no-console: 0 */
import { call, put, takeEvery } from 'redux-saga/effects';
import { fetchUser, updateUser } from '../api/user';
import {
  fetchUserSuccess,
  fetchUserFailure,
  updateUserSuccess,
  updateUserFailure,
  FETCH_USER_REQUEST,
  UPDATE_USER_REQUEST,
} from '../actions/user';

function* fetchUserSaga({ payload }) {
  try {
    const { data: user } = yield call(fetchUser, payload);

    yield put(fetchUserSuccess(user));
  } catch (err) {
    yield put(fetchUserFailure(err));
  }
}

function* updateUserSaga({ payload }) {
  try {
    const { data: user } = yield call(updateUser, payload);

    yield put(updateUserSuccess(user));
  } catch (err) {
    yield put(updateUserFailure(err));
  }
}

export default function* () {
  yield takeEvery(FETCH_USER_REQUEST, fetchUserSaga);
  yield takeEvery(UPDATE_USER_REQUEST, updateUserSaga);
}
