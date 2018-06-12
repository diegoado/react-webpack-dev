'use strict';

import React from 'react';
import PropTypes from 'prop-types';

import Pagination from '../pagination';

import style from './repositories.css';

const Repositories = ({ title, repos }) => (
  <div>
    <h2>{`${title}:`}</h2>
    <ul className={style['repos-list']}>
      {repos.map((repository) => (
        <li key={repository.id}><a href={repository.link}>{repository.name}</a></li>
      ))}
    </ul>
    <Pagination total={10} activePage={3} />
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
