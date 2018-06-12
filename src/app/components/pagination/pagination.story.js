'use strict';

import React from 'react';

import { storiesOf } from '@storybook/react';
import { action } from '@storybook/addon-actions';

import Pagination from './index';

storiesOf('Pagination', module)
  .add('without props', () => (
    <Pagination />
  ))
  .add('with activePage and total', () => (
    <Pagination activePage={5} total={10} />
  ))
  .add('with pagesUrl', () => (
    <Pagination total={3} pagesUrl='http://myhome.com?page' />
  ))
  .add('with callback', () => (
    <Pagination total={15} activePage={7} callback={page => {
      action(`Page ${page} was clicked`);
    }} />
  ));
