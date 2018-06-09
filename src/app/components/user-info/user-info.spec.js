'use strict';

import React from 'react';
import ReactDOM from 'react-dom';

import UserInfo from './index';

it('renders without crashing', () => {
  const div = document.createElement('div');
  ReactDOM.render(<UserInfo />, div);
  ReactDOM.unmountComponentAtNode(div);
});
