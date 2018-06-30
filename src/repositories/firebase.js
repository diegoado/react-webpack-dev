'use strict';

import firebase from 'firebase';

// Initialize Firebase
firebase.initializeApp({
  apiKey: 'AIzaSyAUKRwRbJI4RMJ85Yv4K22wWuvzHqLfBPc',
  authDomain: 'reactflix-e0b6a.firebaseapp.com',
  databaseURL: 'https://reactflix-e0b6a.firebaseio.com',
  projectId: 'reactflix-e0b6a',
  storageBucket: 'reactflix-e0b6a.appspot.com',
  messagingSenderId: '526257516815'
});

export const db = firebase.database();
