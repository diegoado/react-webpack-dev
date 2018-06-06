'use strict';

import React from 'react';
import PropTypes from 'prop-types';

import Actions from '../actions';
import Search from '../search';
import Repositories from '../repositories';
import UserInfo from '../user-info';

import style from './app-content.css';

const AppContent = ({ userInfo, repositories, starred, searchHandle, reposHandle, starredHandle }) => (
  <div className={style['app']}>
    <Search searchHandle={searchHandle} />
    { !!userInfo && <UserInfo userInfo={userInfo} /> }
    { !!userInfo && <Actions reposHandle={reposHandle} starredHandle={starredHandle} /> }

    { !!repositories.length && <Repositories repos={repositories} /> }
    { !!starred.length && <Repositories title='Starred' repos={starred} /> }
  </div>
);

AppContent.defaultProps = {
  userInfo: null,
  repositories: [],
  starred: []
};

AppContent.propTypes = {
  userInfo: PropTypes.object,
  repositories: PropTypes.arrayOf(PropTypes.object),
  starred: PropTypes.arrayOf(PropTypes.object),
  searchHandle: PropTypes.func.isRequired,
  reposHandle: PropTypes.func.isRequired,
  starredHandle: PropTypes.func.isRequired
};

export default AppContent;
