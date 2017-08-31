import {
  FETCH_USER_FAILURE,
  FETCH_USER_SUCCESS,
  UPDATE_USER_OPTION,
} from '../actions/user';

export default (state = {}, { type, payload }) => {
  switch (type) {
    case FETCH_USER_SUCCESS:
      return payload;
    case FETCH_USER_FAILURE:
      return state;
    case UPDATE_USER_OPTION:
      return { ...state, ...payload };
    default:
      return state;
  }
};
