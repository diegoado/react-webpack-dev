'use strict';

import { v4 } from 'uuid';

import * as actions from './actions';

export const addTodo = text => ({
  type: actions.ADD_TODO,
  payload: { id: v4(), text }
});

export const toggleTodo = id => ({
  type: actions.TOGGLE_TODO,
  payload: { id }
});
