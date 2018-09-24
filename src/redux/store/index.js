'use strict';

import { createStore, applyMiddleware } from 'redux';
import {
  connectRouter,
  routerMiddleware
} from 'connected-react-router/immutable';
import { composeWithDevTools } from 'redux-devtools-extension';

import Immutable from 'immutable';
import thunk from 'redux-thunk';

import history from 'routes/history';
import rootReducer from 'reducers';

const composeEnhancers = composeWithDevTools({
  // Specify name here, actionsBlacklist, actionsCreators and other options if needed
});

const logger = ({ dispatch, getState }) => next => action => {
  if (action.type) {
    console.group(`LOGGER->Action: ${action.type}`);
    console.log('Curr State:', getState());
    const nextAction = next(action);
    console.log('Next State:', getState());
    console.groupEnd();

    return nextAction;
  }
  return next(action);
};

const middleware = [thunk, logger, routerMiddleware(history)];

const configureStore = ({ firstState } = Immutable.Map()) => {
  const enhancer = composeEnhancers(applyMiddleware(...middleware));

  const appStore = createStore(
    connectRouter(history)(rootReducer),
    firstState,
    enhancer
  );

  if (module.hot) {
    module.hot.accept('reducers', () => {
      const nextReducer = require('reducers').default;
      appStore.replaceReducer(connectRouter(history)(nextReducer));
    });
  }
  return appStore;
};

export default configureStore;
