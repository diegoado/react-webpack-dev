import React from 'react';
import ReactDOM from 'react-dom';

import { AppContainer } from 'react-hot-loader';

import './index.css';
import App from './app/App';

// import registerServiceWorker from './registerServiceWorker';

const renderApp = (NextApp) => {
  ReactDOM.render(
    <AppContainer>
      <NextApp />
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

// registerServiceWorker();
