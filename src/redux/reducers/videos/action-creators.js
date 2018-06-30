'use strict';

import { db } from 'repositories/firebase';

import { VIDEOS, ADD_VIDEO } from './actions';

export const addVideo = ({ id, title }) => ({
  type: ADD_VIDEO,
  payload: { id, title }
});

export const registerVideo = ({ id, title }) => async dispatch => {
  await db.ref(VIDEOS)
    .child(id)
    .update({ id, title });

  dispatch(addVideo({ id, title }));
};

export const fetchVideos = () => async dispatch => {
  // db.ref(VIDEOS)
  //   .on('value', snapshot => {
  //     snapshot.forEach(child => {
  //       dispatch(addVideo(child.val()));
  //     });
  //   });
  const snapshot = await db.ref(VIDEOS).once('value');

  snapshot.forEach(child => {
    dispatch(addVideo(child.val()));
  });
};
