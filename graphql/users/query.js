import gql from 'graphql-tag';

const userByPk = gql`
  query userByPk {
    users {
      createdAt
      displayName
      email
      photoURL
      userId
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
