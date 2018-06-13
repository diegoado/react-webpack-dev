'use strict';

import React from 'react';
import PropTypes from 'prop-types';

import Pagination from '../pagination';

import style from './repositories.css';

const Repositories = ({ title, repos, pagination, paginationCallback }) => (
  <div>
    <h2>{`${title}:`}</h2>
    <ul className={style['repos-list']}>
      {repos.map((repository) => (
        <li key={repository.id}><a href={repository.link}>{repository.name}</a></li>
      ))}
    </ul>
    <Pagination {...pagination} callback={paginationCallback} />
  </div>
);

Repositories.defaultProps = {
  title: 'Repositories',
  pagination: {
    total: 1,
    activePage: 1
  }
};

Repositories.propTypes = {
  title: PropTypes.string,
  pagination: PropTypes.shape({
    total: PropTypes.number,
    activePage: PropTypes.number
  }),
  repos: PropTypes.arrayOf(PropTypes.shape({
    id: PropTypes.number.isRequired,
    link: PropTypes.string.isRequired,
    name: PropTypes.string.isRequired
  })).isRequired,
  paginationCallback: PropTypes.func.isRequired
};

export default Repositories;
