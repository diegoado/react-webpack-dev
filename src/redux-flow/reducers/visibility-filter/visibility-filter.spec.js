'use strict';

import { expect } from 'chai';
import deepFreeze from 'deep-freeze';

import visibilityFilter, { firstState } from './index';
import {
  SET_VISIBILITY_FILTER,
  SHOW_ALL, SHOW_ACTIVE, SHOW_COMPLETED
} from './actions';

it('should todos be a function', () => {
  expect(visibilityFilter).to.be.a('function');
});

it('should show all todos', () => {
  const before = SHOW_COMPLETED;
  const action = deepFreeze({
    type: SET_VISIBILITY_FILTER,
    payload: {
      filter: SHOW_ALL
    }
  });

  expect(visibilityFilter(before, action)).to.be.deep.equal(SHOW_ALL);
});

it('should show just completed todos', () => {
  const before = SHOW_ALL;
  const action = deepFreeze({
    type: SET_VISIBILITY_FILTER,
    payload: {
      filter: SHOW_COMPLETED
    }
  });

  expect(visibilityFilter(before, action)).to.be.deep.equal(SHOW_COMPLETED);
});

it('should show just active todos', () => {
  const before = SHOW_ALL;
  const action = deepFreeze({
    type: SET_VISIBILITY_FILTER,
    payload: {
      filter: SHOW_ACTIVE
    }
  });

  expect(visibilityFilter(before, action)).to.be.deep.equal(SHOW_ACTIVE);
});

it('should return the latest state when given action is unknown', () => {
  const before = SHOW_COMPLETED;
  const action = deepFreeze({
    type: 'UNKNOWN',
    payload: {
      filter: SHOW_ALL
    }
  });

  expect(visibilityFilter(before, action)).to.be.deep.equal(before);
});

it('should return first state when latest state is undefined', () => {
  const before = undefined;
  const action = deepFreeze({});

  expect(visibilityFilter(before, action)).to.be.deep.equal(firstState);
});
