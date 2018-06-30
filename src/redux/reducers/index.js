'use strict';

import { combineReducers } from 'redux';

import videos from './videos';
import videoSingle from './video-single';
import ui from './ui';

export default combineReducers({
  videos,
  videoSingle,
  ui
});
