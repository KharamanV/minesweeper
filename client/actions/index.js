export const setUsers = users => ({
  type: 'SET_USERS',
  users,
});

export const addUser = user => ({
  type: 'ADD_USER',
  user,
});

export const removeUser = id => ({
  type: 'REMOVE_USER',
  id,
});

export const updateUser = user => ({
  type: 'UPDATE_USER',
  user,
});

export const setUsername = name => ({
  type: 'SET_USERNAME',
  username: name,
});

export const setName = name => ({
  type: 'SET_NAME',
  name,
});

export const setAuth = auth => ({
  type: 'SET_AUTH',
  isAuthenticated: auth,
});
