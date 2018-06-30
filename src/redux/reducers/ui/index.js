'use strict';

import createReducer from '../create-reducer';

import { OPN_REGISTER_VIDEO_FORM, CLS_REGISTER_VIDEO_FORM } from './actions';

const firstState = {
  isOpenRegisterForm: false
};

const ui = createReducer(firstState, {
  [OPN_REGISTER_VIDEO_FORM]: (state, _) => ({
    ...state,
    isOpenRegisterForm: true
  }),
  [CLS_REGISTER_VIDEO_FORM]: (state, _) => ({
    ...state,
    isOpenRegisterForm: false
  })
});

export default ui;
