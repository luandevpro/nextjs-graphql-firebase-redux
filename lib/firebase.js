import firebase from 'firebase/app';
import 'firebase/auth';
import 'firebase/database';

const config = {
  apiKey: 'AIzaSyB4Tws6B7FKUhotupu79M2jXv2imUZcSYw',
  authDomain: 'next-node-hasura-graphql.firebaseapp.com',
  databaseURL: 'https://next-node-hasura-graphql.firebaseio.com',
  projectId: 'next-node-hasura-graphql',
  storageBucket: '',
  messagingSenderId: '650941336649',
  appId: '1:650941336649:web:c2bbc171936129bf',
};

if (!firebase.apps.length) {
  firebase.initializeApp(config, {
    timestampsInSnapshots: true,
  });
}

export default firebase;

export const providerGoogle = new firebase.auth.GoogleAuthProvider();

export const database = firebase.database();
