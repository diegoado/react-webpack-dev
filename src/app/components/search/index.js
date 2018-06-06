'use strict';

import React from 'react';
import PropTypes from 'prop-types';

import style from './search.css';

const Search = ({ isDisabled, searchHandle }) => (
  <div className={style['search']}>
    <input
      type='search'
      placeholder='Type the username on GitHub'
      disabled={isDisabled}
      onKeyUp={searchHandle}
    />
  </div>
);

Search.defaultProps = {
  disabled: false
};

Search.propTypes = {
  isDisabled: PropTypes.bool,
  searchHandle: PropTypes.func.isRequired
};

export default Search;
