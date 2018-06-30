'use strict';

import React from 'react';
import PropTypes from 'prop-types';

import { connect } from 'react-redux';

import Play from './button-play';
import { selectVideoSingle } from 'reducers/video-single/action-creators';

import './video-list.css';
import style from './video-list.css.json';

export const VideosList = ({ videos, handleVideoClick }) => (
  <div className={style['container']}>
    {Object.keys(videos).map(id => (
      <a className={style['video-link']} href='#' onClick={handleVideoClick(id)} key={id}>
        <section className={style['video']}>
          <div className={style['video-thumb']}>
            <Play className={style['button-play']} />
          </div>
          <h2 className={style['video-title']}>{videos[id].title}</h2>
        </section>
      </a>
    ))}
  </div>
);

VideosList.propTypes = {
  videos: PropTypes.object.isRequired,
  handleVideoClick: PropTypes.func.isRequired
};

const mapStateToProps = state => ({
  videos: state.videos
});

const mapDispatchToProps = dispatch => ({
  handleVideoClick: id => e => {
    e.preventDefault();

    dispatch(selectVideoSingle(id));
  }
});

export default connect(mapStateToProps, mapDispatchToProps)(VideosList);
