'use strict';

import { createStore, applyMiddleware } from 'redux';
import { composeWithDevTools } from 'redux-devtools-extension';

import thunk from 'redux-thunk';

import reducer from 'reducers';

const composeEnhancers = composeWithDevTools({
  // Specify name here, actionsBlacklist, actionsCreators and other options if needed
});

const logger = ({ dispatch, getState }) => next => action => {
  console.group(`LOGGER->Action: ${action.type}`);
  console.log('Curr State:', getState());
  const nextAction = next(action);
  console.log('Next State:', getState());
  console.groupEnd();

  return nextAction;
};

export default ({ firstState } = {}) => {
  const enhancer = composeEnhancers(applyMiddleware(logger, thunk));
  const appStore = createStore(reducer, firstState, enhancer);

  module.hot.accept('reducers', () => {
    const nextReducer = require('reducers').default;
    appStore.replaceReducer(nextReducer);
  });

  return appStore;
};
