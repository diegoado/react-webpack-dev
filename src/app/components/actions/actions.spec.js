'use strict';

import React from 'react';
import ReactDOM from 'react-dom';

import Actions from './index';

it('renders without crashing', () => {
  const div = document.createElement('div');
  ReactDOM.render(<Actions />, div);
  ReactDOM.unmountComponentAtNode(div);
});
