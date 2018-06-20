'use strict';

import React from 'react';
import PropTypes from 'prop-types';

import './markdown-editor-button.css';
import style from './markdown-editor-button.css.json';

const Button = ({ handleClick, subClassType, children }) => (
  <button onClick={handleClick}
    className={`${style['button']} ${style[subClassType]}`}>
    { children }
  </button>
);

Button.defaultProps = {
  subClassType: '',
  children: 'click me'
};

Button.propTypes = {
  children: PropTypes.oneOfType([
    PropTypes.arrayOf(PropTypes.node),
    PropTypes.node
  ]),
  subClassType: PropTypes.oneOf(['', 'button-create', 'button-remove']),
  handleClick: PropTypes.func.isRequired
};

export default Button;
