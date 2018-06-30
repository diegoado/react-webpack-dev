'use strict';

import React from 'react';
import PropTypes from 'prop-types';

import './video-single.css';
import style from './video-single.css.json';

const VideoSingle = ({ id, title }) => (
  <div className={style['container']}>
    <iframe
      className={style['video-frame']}
      src={`https://www.youtube-nocookie.com/embed/${id}?rel=0&amp;showinfo=0`}
      frameBorder='0'
      allow='autoplay; encrypted-media'
      allowFullScreen
    />
    <h2 className={style['video-title']}>{title}</h2>
  </div>
);

VideoSingle.propTypes = {
  id: PropTypes.string.isRequired,
  title: PropTypes.string.isRequired
};

export default VideoSingle;
