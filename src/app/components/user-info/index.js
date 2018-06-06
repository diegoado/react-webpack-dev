'use strict';

import React from 'react';
import PropTypes from 'prop-types';

import style from './user-info.css';

const UserInfo = ({ userInfo }) => {
  return (
    <div className={style['user-info']}>
      <img src={userInfo.avatar} />

      <h1>
        <a href={`https://github.com/${userInfo.login}`}>
          {userInfo.name}
        </a>
      </h1>

      <ul className={style['repos-info']}>
        <li>Repositories: {userInfo.repositories}</li>
        <li>Followers: {userInfo.followers}</li>
        <li>Following: {userInfo.following}</li>
      </ul>
    </div>
  );
};

UserInfo.propTypes = {
  userInfo: PropTypes.shape({
    name: PropTypes.string,
    login: PropTypes.string,
    avatar: PropTypes.string,
    repositories: PropTypes.number,
    followers: PropTypes.number,
    following: PropTypes.number
  })
};

export default UserInfo;
