// query client

const userByPk = `
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
