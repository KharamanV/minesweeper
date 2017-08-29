function mineSweeper(state = {}, action) {
  switch (action.type) {
    case 'SET_STATE': {
      return {
        ...state,
        ...action.state,
      };
    }
    case 'REMOVE_USER': {
      const users = state.users.filter(user => user.id !== action.id);
      return {
        ...state,
        users,
      };
    }
    case 'UPDATE_USER': {
      const users = state.users.map(user => (user.id === action.user.id ? action.user : user));
      return {
        ...state,
        users,
      };
    }
    case 'SET_USERNAME': {
      return {
        ...state,
        username: action.username,
      };
    }
    case 'SET_NAME': {
      return {
        ...state,
        name: action.name,
      };
    }
    case 'SET_AUTH': {
      return {
        ...state,
        isAuthenticated: action.isAuthenticated,
      };
    }
    default:
      return state;
  }
}

export default mineSweeper;
