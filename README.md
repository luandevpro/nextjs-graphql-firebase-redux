## .env

```

SPACES_ACCESS_KEY_ID = '5GMTIZP4SWFJYBYSHP'
SPACES_ACCESS_KEY = 'gOEfwTuUzvxzyRq4SEuMMgSSJ1uOEIhhgXawH/0'
HASURA_GRAPHQL_ADMIN_SECRET = '31312312312'
HASURA_GRAPHQL_ENDPOINT = 'https://hasura.herokuapp.com/v1/graphql'
HASURA_GRAPHQL_ENGINE_HOSTNAME = 'hasura.herokuapp.com'
HASURA_GRAPHQL_JWT_SECRET_TYPE = "HS256"
HASURA_GRAPHQL_JWT_SECRET_KEY = "8d9177f1-922f-4777-9308-b09a4b10f789"
JWT_TOKEN_EXPIRES = '15h'
GOGGLE_CLIENT_ID = '548210758981-gmc489ulfdmkaj3ogdhi27kpvmtpj.apps.googleusercontent.com'
GOGGLE_CLIENT_SECRET = '0Rf5_FOFrKoriRrtuxU651'
FACEBOOK_CLIENT_ID = '3137664450367'
FACEBOOK_CLIENT_SECRET = '5b3d326d81c37314adf1d3cc6f1b'

```

## Note write styled-components : && {}

```

const ButtonStyled = styled(Button)`
  && {
    background: linear-gradient(45deg, #fe6b8b 30%, #ff8e53 90%);
    border: 0;
    color: white;
    height: 48px;
    padding: 0 30px;
    box-shadow: 0 3px 5px 2px rgba(255, 105, 135, 0.3);
  }
`;

```
