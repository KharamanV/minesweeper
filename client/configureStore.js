import { createStore } from 'redux';
import mineSweeper from './reducers';

const configureStore = initialState => createStore(mineSweeper, initialState);

export default configureStore;
