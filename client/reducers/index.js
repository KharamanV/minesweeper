import { combineReducers } from 'redux';
import auth from './auth';
import game from './game';
import users from './users';

export default combineReducers({
  auth,
  game,
  users,
});
