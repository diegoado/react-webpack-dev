'use strict';

import {
  ADD_TODO,
  TOGGLE_TODO
} from './actions';

export const firstState = [];

const todos = (state = firstState, { type, payload = {} }) => {
  switch (type) {
    case ADD_TODO:
      return state.concat({
        id: payload.id,
        text: payload.text,
        completed: false
      });
    case TOGGLE_TODO:
      return state.map(todo => (
        {
          ...todo,
          completed: payload.id === todo.id ? !todo.completed : todo.completed
        }
      ));
    default:
      return state;
  }
};

export default todos;
