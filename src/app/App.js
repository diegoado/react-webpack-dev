import React from 'react';

import './App.css';
import style from './App.css.json';

import logo from './logo.svg';

const App = () => (
  <div className={style['app']}>
    <header className={style['header']}>
      <img src={logo} className={style['logo']} alt='logo' />
      <h1 className={style['title']}>Welcome to React</h1>
    </header>
    <p className={style['intro']}>
      To get started, edit <code>src/App.js</code> and save to reload.
    </p>
  </div>
);

export default App;
