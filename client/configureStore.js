import { createStore, applyMiddleware } from 'redux';
import logger from 'redux-logger';
import mineSweeper from './reducers';

export default initialState => createStore(
  mineSweeper,
  initialState,
  applyMiddleware(logger),
);
