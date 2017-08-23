export const setState = state => ({
  type: 'SET_STATE',
  state,
});

export const removeUser = id => ({
  type: 'REMOVE_USER',
  id,
});

export const updateUser = user => ({
  type: 'REMOVE_USER',
  user,
});
