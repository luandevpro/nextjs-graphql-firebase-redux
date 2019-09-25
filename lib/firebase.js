import firebase from 'firebase/app';
import 'firebase/auth';
import 'firebase/database';
import firebaseConfig from './firebaseConfig';

if (!firebase.apps.length) {
  firebase.initializeApp(firebaseConfig, {
    timestampsInSnapshots: true,
  });
}

export default firebase;

export const auth = firebase.auth();

export const providerGoogle = new firebase.auth.GoogleAuthProvider();

export const database = firebase.database();
