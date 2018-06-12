'use strict';

import React from 'react';
import ReactDOM from 'react-dom';

import Pagination from './index';

it('renders without crashing', () => {
  const div = document.createElement('div');
  ReactDOM.render(<Pagination />, div);
  ReactDOM.unmountComponentAtNode(div);
});
