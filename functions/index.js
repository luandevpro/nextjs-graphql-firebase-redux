const functions = require('firebase-functions');
const admin = require('firebase-admin');

admin.initializeApp(functions.config().firebase);

// On sign up.
exports.processSignUp = functions.auth.user().onCreate((user) => {
  let customClaims;
  if (user.email && user.email.endsWith('luandevpro@gmail.com')) {
    customClaims = {
      admin: true,
    };
  } else {
    customClaims = {
      admin: false,
    };
  }
  return admin
    .auth()
    .setCustomUserClaims(user.uid, {
      admin: customClaims.admin,
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
