'use strict';

import React from 'react';

import { storiesOf } from '@storybook/react';
import { action } from '@storybook/addon-actions';

import Actions from './index';

storiesOf('Actions', module)
  .add('with actions handles', () => (
    <Actions
      reposHandle={action('Get Repositories')}
      starredHandle={action('Get Starred')}
    />
  ));
