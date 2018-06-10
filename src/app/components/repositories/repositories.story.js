'use strict';

import React from 'react';

import { storiesOf } from '@storybook/react';

import Repositories from './index';

storiesOf('Repositories', module)
  .add('with empty repositories', () => (
    <Repositories repos={[]} />
  ));
