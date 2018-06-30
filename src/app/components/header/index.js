'use strict';

import React from 'react';
import PropTypes from 'prop-types';

import { connect } from 'react-redux';

import { opnRegisterVideo } from 'reducers/ui/action-creators';

import './header.css';
import style from './header.css.json';

export const Header = ({ handleOpenRegisterVideo }) => (
  <header className={style['header']}>
    <h1 className={style['header-title']}>Reactflix</h1>

    <button className={style['register-button']} onClick={handleOpenRegisterVideo}>
      Register Video
    </button>
  </header>
);

Header.propTypes = {
  handleOpenRegisterVideo: PropTypes.func.isRequired
};

const mapDispatchToProps = {
  handleOpenRegisterVideo: opnRegisterVideo
};

export default connect(null, mapDispatchToProps)(Header);
