'use strict';

import { SET_VISIBILITY_FILTER, SHOW_ALL } from './actions';

export const firstState = SHOW_ALL;

const visibilityFilter = (state = firstState, { type, payload = {} }) => {
  switch (type) {
    case SET_VISIBILITY_FILTER:
      return payload.filter;
    default:
      return state;
  }
};

export default visibilityFilter;
