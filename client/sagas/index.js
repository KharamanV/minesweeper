import { fork } from 'redux-saga/effects';
import gameSaga from './game';
import gameUser from './user';

export default function* () {
  yield [
    fork(gameSaga),
    fork(gameUser),
  ];
}
