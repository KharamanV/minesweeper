export default (state = [], action) => {
  switch (action.type) {
    case 'SET_PRESETS': {
      return action.presets;
    }
    case 'ADD_PRESET': {
      return [...state, action.preset];
    }
    case 'REMOVE_PRESET': {
      return state.filter(preset => preset.id !== action.id);
    }
    case 'UPDATE_PRESET': {
      return state.map(preset => (preset.id === action.preset.id ? action.preset : preset));
    }
    default:
      return state;
  }
};
