'use strict';

import { expect } from 'chai';
import deepFreeze from 'deep-freeze';

import todos, { firstState } from './index';
import * as actions from './actions';

it('should todos be a function', () => {
  expect(todos).to.be.a('function');
});

it('should add a todo item', () => {
  const before = deepFreeze([]);
  const action = deepFreeze({
    type: actions.ADD_TODO,
    payload: {
      id: 1,
      text: 'Something to do!'
    }
  });

  const after = [
    {
      id: 1,
      text: 'Something to do!',
      completed: false
    }
  ];
  expect(todos(before, action)).to.be.deep.equal(after);
});

it('should add another todo item', () => {
  const before = deepFreeze([
    {
      id: 1,
      text: 'Something to do!',
      completed: false
    }
  ]);
  const action = deepFreeze({
    type: actions.ADD_TODO,
    payload: {
      id: 2,
      text: 'Something to do!'
    }
  });

  const after = [
    {
      id: 1,
      text: 'Something to do!',
      completed: false
    },
    {
      id: 2,
      text: 'Something to do!',
      completed: false
    }
  ];
  expect(todos(before, action)).to.be.deep.equal(after);
});

it('should toggle first todo', () => {
  const before = deepFreeze([
    {
      id: 1,
      text: 'Something to do!',
      completed: false
    },
    {
      id: 2,
      text: 'Something to do!',
      completed: false
    }
  ]);
  const action = deepFreeze({
    type: actions.TOGGLE_TODO,
    payload: {
      id: 1
    }
  });

  const after = [
    {
      id: 1,
      text: 'Something to do!',
      completed: true
    },
    {
      id: 2,
      text: 'Something to do!',
      completed: false
    }
  ];
  expect(todos(before, action)).to.be.deep.equal(after);
});

it('should toggle second todo', () => {
  const before = deepFreeze([
    {
      id: 1,
      text: 'Something to do!',
      completed: false
    },
    {
      id: 2,
      text: 'Something to do!',
      completed: false
    }
  ]);
  const action = deepFreeze({
    type: actions.TOGGLE_TODO,
    payload: {
      id: 2
    }
  });

  const after = [
    {
      id: 1,
      text: 'Something to do!',
      completed: false
    },
    {
      id: 2,
      text: 'Something to do!',
      completed: true
    }
  ];
  expect(todos(before, action)).to.be.deep.equal(after);
});

it('should return the latest state when given action is unknown', () => {
  const before = deepFreeze([
    {
      id: 1,
      text: 'Something to do!',
      completed: false
    }
  ]);
  const action = deepFreeze({
    type: 'UNKNOWN'
  });

  expect(todos(before, action)).to.be.deep.equal(before);
});

it('should return first state when latest state is undefined', () => {
  const before = undefined;
  const action = deepFreeze({});

  expect(todos(before, action)).to.be.deep.equal(firstState);
});
