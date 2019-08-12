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

export { userByPk };
