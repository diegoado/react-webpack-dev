'use strict';

import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';

import { connect } from 'react-redux';

import Header from 'components/header';
import RegisterVideo from 'components/register-video';
import VideoList from 'components/video-list';
import VideoSingle from 'components/video-single';

import { fetchVideos } from 'reducers/videos/action-creators';

import './App.css';
import style from './App.css.json';

class App extends PureComponent {
  componentDidMount () {
    this.props.fetchVideos();
  }

  render () {
    const { isOpenRegisterForm, videoSingleId, videos } = this.props;
    return (
      <div className={style['container']}>
        <Header />
        <main className={style['main']}>
          { isOpenRegisterForm && <RegisterVideo /> }
          { !!videoSingleId &&
          <VideoSingle id={videoSingleId} title={videos[videoSingleId].title} /> }
          <VideoList />
        </main>
        <footer className={style['footer']}>
          &copy; 2018
        </footer>
      </div>
    );
  }
}

App.defaultProps = {
  videoSingleId: '',
  videos: {}
};

App.propTypes = {
  isOpenRegisterForm: PropTypes.bool.isRequired,
  videoSingleId: PropTypes.string,
  videos: PropTypes.object,
  fetchVideos: PropTypes.func.isRequired
};

const mapStateToProps = state => ({
  // eslint-disable-next-line key-spacing
  isOpenRegisterForm  : state.ui.isOpenRegisterForm,
  videoSingleId: state.videoSingle,
  videos: state.videos
});

const mapDispatchToProps = {
  fetchVideos
};

export default connect(mapStateToProps, mapDispatchToProps)(App);
