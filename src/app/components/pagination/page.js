'use strict';

import React from 'react';
import PropTypes from 'prop-types';

import style from './pagination.css';

const Dots = () => <span className={style['pagination-link']}>...</span>;

const Page = ({ page, url, callback }) => {
  const Component = page === '...' ? Dots : 'a';

  const onClicked = !callback ? null : e => {
    e.preventDefault();
    callback(page);
  };

  return (
    <Component className={style['pagination-link']} href={`${url}=${page}`} onClick={onClicked}>
      {page}
    </Component>
  );
};

Page.defaultProps = {
  url: '#'
};

Page.propTypes = {
  page: PropTypes.oneOfType([PropTypes.number, PropTypes.string]).isRequired,
  url: PropTypes.string,
  callback: PropTypes.func
};

export default Page;
