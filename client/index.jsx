import React from 'react';
import { render } from 'react-dom';
import { Provider } from 'react-redux';
import App from './components/App';
import configureStore from './configureStore';

const store = configureStore({ username: null, users: [], showAdd: false, showUserList: false });

render(
  <Provider store={store}>
    <App />
  </Provider>,
  document.getElementById('root'),
);
