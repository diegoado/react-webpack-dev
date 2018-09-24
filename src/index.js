import React from 'react';
import ReactDOM from 'react-dom';

import { AppContainer } from 'react-hot-loader';
import { Provider } from 'react-redux';

import registerServiceWorker from './registerServiceWorker';
import createStore from 'store';
import Routes from 'routes';

import './styles.css';
import './global.css';

const store = createStore();

const renderApp = AppRoutes => {
  ReactDOM.render(
    <AppContainer>
      <Provider store={store}>
        <AppRoutes />
      </Provider>
    </AppContainer>,
    document.querySelector('[data-js="app-root"]')
  );
};

renderApp(Routes);

if (module.hot) {
  module.hot.accept('routes', () => {
    const AppRoutes = require('routes').default;
    renderApp(AppRoutes);
  });
}

registerServiceWorker();
