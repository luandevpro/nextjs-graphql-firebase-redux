// query server
exports.userByPk = `
   query userByPk($userId: String!, $email: String!) {
      users_by_pk(userId: $userId, email: $email) {
         displayName
         email
         photoURL
         userId
      }
   }
`;
