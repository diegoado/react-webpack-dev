'use strict';

import React from 'react';
import ReactDOM from 'react-dom';

import Repositories from './index';

it('renders without crashing', () => {
  const div = document.createElement('div');
  ReactDOM.render(<Repositories repos={[]} />, div);
  ReactDOM.unmountComponentAtNode(div);
});
