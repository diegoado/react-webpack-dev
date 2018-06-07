'use strict';

import React from 'react';
import PropTypes from 'prop-types';

import Actions from '../actions';
import Search from '../search';
import Repositories from '../repositories';
import UserInfo from '../user-info';

import style from './app-content.css';

const AppContent = ({ userInfo, repos, starred, isFetching, searchHandle, reposHandle, starredHandle }) => (
  <div className={style['app']}>
    <Search isDisabled={isFetching} searchHandle={searchHandle} />
    { isFetching && <div>Loading...</div>}
    { !!userInfo && <UserInfo {...userInfo} /> }
    { !!userInfo && <Actions reposHandle={reposHandle} starredHandle={starredHandle} /> }

    { !!repos.length && <Repositories repos={repos} /> }
    { !!starred.length && <Repositories title='Starred' repos={starred} /> }
  </div>
);

AppContent.defaultProps = {
  userInfo: null,
  repositories: [],
  starred: [],
  isFetching: false
};

AppContent.propTypes = {
  userInfo: PropTypes.object,
  repos: PropTypes.arrayOf(PropTypes.object),
  starred: PropTypes.arrayOf(PropTypes.object),
  isFetching: PropTypes.bool,
  searchHandle: PropTypes.func.isRequired,
  reposHandle: PropTypes.func.isRequired,
  starredHandle: PropTypes.func.isRequired
};

export default AppContent;
