import gql from 'graphql-tag';

export default (context, apolloClient) => {
  return apolloClient
    .query({
      query: gql`
        query userByPkss {
          users {
            createdAt
            displayName
            email
            photoURL
            userId
          }
        }
      `,
    })
    .then(({ data }) => {
      return { loggedInUser: data };
    })
    .catch((e) => {
      // Fail gracefully
      console.log(e);
    });
};
