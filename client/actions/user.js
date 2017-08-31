export const FETCH_USER_REQUEST = 'FETCH_USER_REQUEST';
export const FETCH_USER_SUCCESS = 'FETCH_USER_SUCCESS';
export const FETCH_USER_FAILURE = 'FETCH_USER_FAILURE';
export const UPDATE_USER_OPTION = 'UPDATE_USER_OPTION';
export const UPDATE_USER_REQUEST = 'UPDATE_USER_REQUEST';
export const UPDATE_USER_SUCCESS = 'UPDATE_USER_SUCCESS';
export const UPDATE_USER_FAILURE = 'UPDATE_USER_FAILURE';

export const fetchUserRequest = () => ({
  type: FETCH_USER_REQUEST,
});

export const fetchUserSuccess = user => ({
  type: FETCH_USER_SUCCESS,
  payload: user,
});

export const fetchUserFailure = error => ({
  error,
  type: FETCH_USER_FAILURE,
});

export const updateUserOption = value => ({
  type: UPDATE_USER_OPTION,
  payload: value,
});

export const updateUserRequest = user => ({
  type: UPDATE_USER_REQUEST,
  payload: user,
});

export const updateUserSuccess = user => ({
  type: UPDATE_USER_SUCCESS,
  payload: user,
});

export const updateUserFailure = error => ({
  error,
  type: UPDATE_USER_FAILURE,
});
