'use strict';

import createReducer from '../create-reducer';
import { ADD_VIDEO } from './actions';

const firstState = {};

const videos = createReducer(firstState, {
  [ADD_VIDEO]: (state, { type, payload = {} }) => ({
    ...state,
    [payload.id]: {
      id: payload.id,
      title: payload.title
    }
  })
});

export default videos;
