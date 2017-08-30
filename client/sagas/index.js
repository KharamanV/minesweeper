import { fork } from 'redux-saga/effects';
import gameSaga from './game';

export default function* () {
  yield [
    fork(gameSaga),
  ];
}
