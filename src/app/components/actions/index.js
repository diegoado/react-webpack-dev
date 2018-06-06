'use strict';

import React from 'react';
import PropTypes from 'prop-types';

import style from './actions.css';

const Actions = ({ reposHandle, starredHandle }) => (
  <div className={style['actions']}>
    <button onClick={reposHandle}>Show Repositories</button>
    <button onClick={starredHandle}>Show Starred</button>
  </div>
);

Actions.propTypes = {
  reposHandle: PropTypes.func.isRequired,
  starredHandle: PropTypes.func.isRequired
};

export default Actions;
