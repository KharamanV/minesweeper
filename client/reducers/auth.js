export default (state = {}, action) => {
  switch (action.type) {
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
};
