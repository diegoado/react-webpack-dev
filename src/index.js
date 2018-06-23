import React from 'react';
import ReactDOM from 'react-dom';

import { AppContainer } from 'react-hot-loader';
import { Provider } from 'react-redux';
import { createStore } from 'redux';

import registerServiceWorker from './registerServiceWorker';
import reducer from 'reducers';

import './styles.css';
import App from './app/App';

const store = createStore(reducer);

const renderApp = (NextApp) => {
  ReactDOM.render(
    <AppContainer>
      <Provider store={store}>
        <NextApp />
      </Provider>
    </AppContainer>,
    document.querySelector('[data-js="app-root"]')
  );
};

renderApp(App);

if (module.hot) {
  module.hot.accept('./app/App', () => {
    const NextApp = require('./app/App').default;
    renderApp(NextApp);
  });
}

registerServiceWorker();
