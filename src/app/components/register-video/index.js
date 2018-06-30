'use strict';

import React from 'react';
import PropTypes from 'prop-types';

import { connect } from 'react-redux';

import { clsRegisterVideo } from 'reducers/ui/action-creators';
import { registerVideo } from 'reducers/videos/action-creators';

import './register-video.css';
import style from './register-video.css.json';

export const RegisterVideo = ({ handleSubmit, handleCloseRegisterVideo }) => (
  <form className={style['register-video']} onSubmit={handleSubmit}>
    <h2>Register Video</h2>

    <label htmlFor='id'>Video ID:</label>
    <input type='text' id='id' name='id' />

    <label htmlFor='title'>Video Title:</label>
    <input type='text' id='text' name='title' />

    <button type='submit'>Register</button>

    <button
      className={style['close-button']}
      type='button'
      onClick={handleCloseRegisterVideo}>
      &times;
    </button>
  </form>
);

RegisterVideo.propTypes = {
  handleSubmit: PropTypes.func.isRequired,
  handleCloseRegisterVideo: PropTypes.func.isRequired
};

const mapDispatchToProps = dispatch => ({
  handleSubmit: async e => {
    e.preventDefault();
    const target = e.target;

    const {
      id: { value: id },
      title: { value: title }
    } = target;

    await dispatch(registerVideo({ id, title }));

    target.reset();
    target[0].focus();
  },
  handleCloseRegisterVideo: () => dispatch(clsRegisterVideo())
});

export default connect(null, mapDispatchToProps)(RegisterVideo);
