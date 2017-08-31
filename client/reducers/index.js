import { combineReducers } from 'redux';
import auth from './auth';
import game from './game';
import users from './users';
import user from './user';

export default combineReducers({
  auth,
  game,
  users,
  user,
});
