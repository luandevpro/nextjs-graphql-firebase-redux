import gql from 'graphql-tag';

const insertUsers = gql`
  mutation insertUsers($objects: [users_insert_input!]!) {
    insert_users(objects: $objects) {
      returning {
        email
        userId
        photoURL
        displayName
      }
    }
  }
`;

export { insertUsers };
