import firebase from 'firebase/app';
import 'firebase/auth';
import 'firebase/database';
import 'firebase/analytics';
import 'firebase/performance';
import firebaseConfig from './firebaseConfig';

if (!firebase.apps.length) {
  firebase.initializeApp(firebaseConfig, {
    timestampsInSnapshots: true,
  });
}

const perf = {
  perf: null,
};

// analytics && performance firebase
if (process.browser) {
  firebase.analytics().logEvent('notification_received');
  perf.perf = firebase.performance();
}

export default firebase;

export const auth = firebase.auth();

export const providerGoogle = new firebase.auth.GoogleAuthProvider();

export const providerFacebook = new firebase.auth.FacebookAuthProvider();

export const database = firebase.database();

export const performance = perf.perf;
