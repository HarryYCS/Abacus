import React from 'react';
import { StyleSheet, Text, View } from 'react-native';

import * as firebase from 'firebase';
import firestore from 'firebase/firestore';

// Init Firbase
const firebaseConfig = {
  apiKey: "AIzaSyDoBXUJY9qmJQ4XXoYvYdqHSd7lMe4ljSc",
  authDomain: "abacus-98ccb.firebaseapp.com",
  databaseURL: "https://abacus-98ccb.firebaseio.com",
  projectId: "abacus-98ccb",
  storageBucket: "abacus-98ccb.appspot.com",
  messagingSenderId: "221359904169",
  appId: "1:221359904169:web:6cce8c42f49ce3619ee0b8",
  measurementId: "G-SZXKC7C7XV"
};

firebase.initializeApp(firebaseConfig);

export default firebase;
