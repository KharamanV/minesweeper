import { combineReducers } from 'redux';
import auth from './auth';
import game from './game';
import users from './users';
import presets from './presets';
import user from './user';

export default combineReducers({
  auth,
  game,
  users,
  presets,
  user,
});
