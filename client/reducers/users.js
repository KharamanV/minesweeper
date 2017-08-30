export default (state = [], action) => {
  switch (action.type) {
    case 'SET_USERS': {
      return action.users;
    }
    case 'ADD_USER': {
      return [...state, action.user];
    }
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
