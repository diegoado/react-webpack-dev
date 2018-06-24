'use strict';

const createReducer = (start, actions) => {
  return (state = start, { type, payload }) => (
    actions.hasOwnProperty(type)
      ? actions[type].call(null, state, { type, payload })
      : state
  );
};

export default createReducer;
