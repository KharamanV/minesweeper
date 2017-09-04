import React from 'react';
import { render } from 'react-dom';
import { Provider } from 'react-redux';
import App from './components/App/index';
import configureStore from './configureStore';

const store = configureStore({
  auth: { isAuthenticated: false },
  game: { isFetching: false },
});

render(
  <Provider store={store}>
    <App />
  </Provider>,
  document.getElementById('root'),
);
