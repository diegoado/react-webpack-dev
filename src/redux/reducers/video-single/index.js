'use strict';

import createReducer from '../create-reducer';

import { SELECT_VIDEO_SINGLE } from './actions';

const firstState = '';

const videoSingle = createReducer(firstState, {
  [SELECT_VIDEO_SINGLE]: (_, { type, payload = {} }) => payload.id
});

export default videoSingle;
