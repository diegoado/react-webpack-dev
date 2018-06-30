'use strict';

import { createStore, applyMiddleware } from 'redux';
import { composeWithDevTools } from 'redux-devtools-extension';

import thunk from 'redux-thunk';

import reducer from 'reducers';

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

export default ({ firstState } = {}) => {
  const enhancer = composeEnhancers(applyMiddleware(logger, thunk));
  const appStore = createStore(reducer, firstState, enhancer);

  if (module.hot) {
    module.hot.accept('reducers', () => {
      const nextReducer = require('reducers').default;
      appStore.replaceReducer(nextReducer);
    });
  }
  return appStore;
};
