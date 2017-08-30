export default (state = [], action) => {
  switch (action.type) {
    case 'REMOVE_USER': {
      return state.filter(user => user.id !== action.id);
    }
    case 'UPDATE_USER': {
      return state.map(user => (user.id === action.user.id ? action.user : user));
    }
    default:
      return state;
  }
};
