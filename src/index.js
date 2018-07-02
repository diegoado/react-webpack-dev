import React from 'react';
import ReactDOM from 'react-dom';

import { AppContainer } from 'react-hot-loader';
import { Provider } from 'react-redux';
import { ConnectedRouter } from 'connected-react-router';
import { renderRoutes } from 'react-router-config';

import registerServiceWorker from './registerServiceWorker';
import configureStore, { history } from 'store';
import routes from 'routes';

import './styles.css';
import './global.css';

const store = configureStore();

const renderApp = appRoutes => {
  ReactDOM.render(
    <AppContainer>
      <Provider store={store}>
        <ConnectedRouter history={history}>
          { renderRoutes(appRoutes) }
        </ConnectedRouter>
      </Provider>
    </AppContainer>,
    document.querySelector('[data-js="app-root"]')
  );
};

renderApp(routes);

if (module.hot) {
  module.hot.accept('routes', () => {
    const appRoutes = require('routes').default;
    renderApp(appRoutes);
  });
}

registerServiceWorker();
