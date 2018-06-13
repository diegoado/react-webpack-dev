'use strict';

import React from 'react';
import PropTypes from 'prop-types';

import Actions from '../actions';
import Search from '../search';
import Repositories from '../repositories';
import UserInfo from '../user-info';

import style from './app-content.css';

const AppContent = ({
  userInfo, repos, starred, isFetching, searchHandle, actionHandle
}) => (
  <div className={style['app']}>
    <Search isDisabled={isFetching} searchHandle={searchHandle} />
    { isFetching && <div>Loading...</div>}
    { !!userInfo && <UserInfo {...userInfo} /> }
    { !!userInfo &&
    <Actions
      reposHandle={() => actionHandle('repos')}
      starredHandle={() => actionHandle('starred')}
    /> }

    <div className={style['repos-container']}>
      { !!repos.repos.length &&
      <Repositories
        {...repos}
        paginationCallback={page => actionHandle('repos', page)}
      /> }
      { !!starred.repos.length &&
      <Repositories
        {...starred}
        title='Starred'
        paginationCallback={page => actionHandle('starred', page)}
      /> }
    </div>
  </div>
);

AppContent.defaultProps = {
  userInfo: null,
  repos: {
    repos: [],
    pagination: undefined
  },
  starred: {
    repos: [],
    pagination: undefined
  },
  isFetching: false
};

AppContent.propTypes = {
  userInfo: PropTypes.object,
  repos: PropTypes.shape({
    repos: PropTypes.arrayOf(PropTypes.object),
    pagination: PropTypes.object
  }),
  starred: PropTypes.shape({
    repos: PropTypes.arrayOf(PropTypes.object),
    pagination: PropTypes.object
  }),
  isFetching: PropTypes.bool,
  searchHandle: PropTypes.func.isRequired,
  actionHandle: PropTypes.func.isRequired
};

export default AppContent;
