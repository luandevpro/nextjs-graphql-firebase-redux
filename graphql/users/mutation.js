import gql from 'graphql-tag';

const insertUsers = gql`
  mutation insertUsers($objects: [users_insert_input!]!) {
    insert_users(
      objects: $objects
      on_conflict: {
        constraint: users_pkey
        update_columns: [displayName, email, photoURL, userId, password]
      }
    ) {
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
