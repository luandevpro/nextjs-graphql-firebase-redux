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

exports.users = `
   query users($email: String) {
      users(where: { email: { _eq: $email } }) {
         userId
         displayName
         email
         password
      }
   }
`;
