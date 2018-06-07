'use strict';

import React from 'react';
import PropTypes from 'prop-types';

import style from './user-info.css';

const UserInfo = ({ name, login, avatar, repositories, followers, following }) => {
  return (
    <div className={style['user-info']}>
      <img src={avatar} />

      <h1>
        <a href={`https://github.com/${login}`}>
          {name}
        </a>
      </h1>

      <ul className={style['repos-info']}>
        <li>Repositories: {repositories}</li>
        <li>Followers: {followers}</li>
        <li>Following: {following}</li>
      </ul>
    </div>
  );
};

UserInfo.propTypes = {
  name: PropTypes.string.isRequired,
  login: PropTypes.string.isRequired,
  avatar: PropTypes.string.isRequired,
  repositories: PropTypes.number.isRequired,
  followers: PropTypes.number.isRequired,
  following: PropTypes.number.isRequired
};

export default UserInfo;
