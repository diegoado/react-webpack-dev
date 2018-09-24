'use strict';

import React from 'react';

import './app.css';
import style from './app.css.json';

import logo from './logo.svg';

const App = () => (
  <div className={style['app']}>
    <header className={style['header']}>
      <img src={logo} className={style['logo']} alt="logo" />
      <h1 className={style['title']}>Welcome to React</h1>
    </header>
    <p className={style['intro']}>
      To get started, edit <code>components/App.js</code> and save to reload.
    </p>
  </div>
);

export default App;
