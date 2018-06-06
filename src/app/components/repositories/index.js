'use strict';

import React from 'react';
import PropTypes from 'prop-types';

import style from './repositories.css';

const Repositories = ({ title, repos }) => (
  <div className={style['repos']}>
    <h2>{`${title}:`}</h2>
    <ul>
      {repos.map((repository) => (
        <li key={repository.id}><a href={repository.link}>{repository.name}</a></li>
      ))}
    </ul>
  </div>
);

Repositories.defaultProps = {
  title: 'Repositories'
};

Repositories.propTypes = {
  title: PropTypes.string,
  repos: PropTypes.arrayOf(PropTypes.object).isRequired
};

export default Repositories;
