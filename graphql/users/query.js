import gql from 'graphql-tag';

const userByPk = gql`
  query userByPk($userId: String!) {
    users_by_pk(userId: $userId) {
      createdAt
      displayName
      email
      photoURL
      userId
      admin
    }
  }
`;

const users = gql`
  query users($email: String!) {
    users(where: { email: { _eq: $email } }) {
      userId
    }
  }
`;
export { userByPk, users };
