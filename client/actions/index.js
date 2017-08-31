export const SET_USERS = 'SET_USERS';
export const ADD_USER = 'ADD_USER';
export const REMOVE_USER = 'REMOVE_USER';
export const UPDATE_USER = 'UPDATE_USER';
export const SET_USERNAME = 'SET_USERNAME';
export const SET_NAME = 'SET_NAME';
export const SET_AUTH = 'SET_AUTH';

export const setPresets = presets => ({
  type: 'SET_PRESETS',
  presets,
});

export const addPreset = preset => ({
  type: 'ADD_USER',
  preset,
});

export const removePreset = id => ({
  type: 'REMOVE_USER',
  id,
});

export const updatePreset = preset => ({
  type: 'UPDATE_USER',
  preset,
});

export const setUsers = users => ({
  type: SET_USERS,
  users,
});

export const addUser = user => ({
  type: ADD_USER,
  user,
});

export const removeUser = id => ({
  type: REMOVE_USER,
  id,
});

export const updateUser = user => ({
  type: UPDATE_USER,
  user,
});

export const setUsername = name => ({
  type: SET_USERNAME,
  username: name,
});

export const setName = name => ({
  type: SET_NAME,
  name,
});

export const setAuth = auth => ({
  type: SET_AUTH,
  isAuthenticated: auth,
});
