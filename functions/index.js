const functions = require('firebase-functions');
const admin = require('firebase-admin');

admin.initializeApp(functions.config().firebase);

// On sign up.
exports.processSignUp = functions.auth.user().onCreate((user) => {
  return admin
    .auth()
    .setCustomUserClaims(user.uid, {
      'https://hasura.io/jwt/claims': {
        'x-hasura-default-role': 'user',
        'x-hasura-allowed-roles': ['user'],
        'x-hasura-user-id': user.uid,
      },
    })
    .then(() => {
      const metadataRef = admin.database().ref(`metadata/${user.uid}`);
      return metadataRef.set({ refreshTime: new Date().getTime() });
    })
    .catch((error) => {
      console.log(error);
    });
});

exports.sendCouponOnPurchase = functions.analytics.event('login').onLog((event) => {
  const { user } = event;
  console.log(user);
});

exports.getWatsonToken = functions.database.ref('userLoginEvent').onUpdate((change) => {
  const { after } = change;
  console.log(after.data);
  return after;
});
