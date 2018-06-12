'use strict';

import React from 'react';
import PropTypes from 'prop-types';

import pagination from '../../utils/pagination';
import Page from './page';

import style from './pagination.css';

const Pagination = ({ activePage, total, pagesUrl, callback }) => (
  <ul className={style['pagination']}>
    {pagination({ activePage, total }).map((page, index) => (
      <li key={index} className={`${style['pagination-item']} ${activePage === page ? style['active'] : ''}`}>
        <Page page={page} url={pagesUrl} callback={callback} />
      </li>
    ))}
  </ul>
);

Pagination.defaultProps = {
  activePage: 1,
  total: 1
};

Pagination.propTypes = {
  activePage: PropTypes.number,
  total: PropTypes.number,
  pagesUrl: PropTypes.string,
  callback: PropTypes.func
};

export default Pagination;
