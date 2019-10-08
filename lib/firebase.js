import firebase from 'firebase/app';
import 'firebase/auth';
import 'firebase/database';
import 'firebase/analytics';
import 'firebase/performance';
import firebaseConfig from './firebaseConfig';

require('@firebase/remote-config'); // eslint-disable-line

if (!firebase.apps.length) {
  firebase.initializeApp(firebaseConfig, {
    timestampsInSnapshots: true,
  });
}

const fire = {
  perf: null,
  remote: null,
};

// analytics && performance firebase
if (process.browser) {
  firebase.analytics().logEvent('notification_received');
  fire.perf = firebase.performance();
  fire.remote = firebase.remoteConfig();
  fire.remote.settings = {
    minimumFetchIntervalMillis: 0,
  };
}

export default firebase;

export const auth = firebase.auth();

export const providerGoogle = new firebase.auth.GoogleAuthProvider();

export const providerFacebook = new firebase.auth.FacebookAuthProvider();

export const database = firebase.database();

export const performance = fire.perf;

export const remoteConfig = fire.remote;
