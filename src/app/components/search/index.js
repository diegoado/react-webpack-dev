'use strict';

import React from 'react';
import PropTypes from 'prop-types';

import style from './search.css';

const Search = ({ searchHandle }) => {
  return (
    <div className={style['search']}>
      <input
        type='search'
        placeholder='Type the username on GitHub'
        onKeyUp={searchHandle}
      />
    </div>
  );
};

Search.propTypes = {
  searchHandle: PropTypes.func.isRequired
};

export default Search;
