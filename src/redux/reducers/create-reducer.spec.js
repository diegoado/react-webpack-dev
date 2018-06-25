'use strict';

import { expect } from 'chai';
import deepFreeze from 'deep-freeze';

import createReducer from './create-reducer';

const firstState = 0;

const cntReducer = createReducer(firstState, {
  'INCREMENT': (state, _) => state + 1,
  'DECREMENT': (state, _) => state - 1
});

it('create reducer should be a function', () => {
  expect(createReducer).to.be.a('function');
});

it('create reducer should return the reducer function', () => {
  expect(createReducer(firstState, {})).to.be.a('function');
});

it('create reducer should create a reducer', () => {
  const before = 1;
  const action = deepFreeze({ type: 'INCREMENT' });

  const after = 2;
  expect(cntReducer(before, action)).to.be.equal(after);
});

it('reducer should return latest state when given action is unknown', () => {
  const before = 3;
  const action = deepFreeze({ type: 'UNKNOWN' });

  expect(cntReducer(before, action)).to.be.equal(before);
});

it('reducer should return first state when latest is undefined', () => {
  const before = undefined;
  const action = deepFreeze({});

  expect(cntReducer(before, action)).to.be.equal(firstState);
});

it('first state shouldn\'t be undefined', () => {
  try {
    createReducer(undefined, {});
    expect.fail(null, null, 'error expected');
  } catch (e) {
    expect(e.message).to.be.equal('first state mustn\'t be undefined');
  }
});

it('reducer\'s actions shouldn\'t be different of object', () => {
  try {
    createReducer(firstState);
    expect.fail(null, null, 'error expected');
  } catch (e) {
    expect(e.message).to.be.equal('The reducer\'s actions must be an object');
  }
});
