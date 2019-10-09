## .env

```

SPACES_ACCESS_KEY_ID = '5GMTIZP4SWFJYBYSHPZL'
SPACES_ACCESS_KEY = 'gOEfwTuUzvxzyRq4SEuMMgSSJ1uOEIhhgXawHbK7t/0'
HASURA_GRAPHQL_ADMIN_SECRET = '123456789'
HASURA_GRAPHQL_ENDPOINT = 'https://nextjs-graphql-firebase-redux.herokuapp.com/v1/graphql'
HASURA_GRAPHQL_ENGINE_HOSTNAME = 'nextjs-graphql-firebase-redux.herokuapp.com'
FACEBOOK_CLIENT_ID = '313766442850367'
FACEBOOK_CLIENT_SECRET = '5b3d329f666d81c37314adf1d3cc6f1b'
DOMAIN_TO_CREATE_SITEMAP = 'http://localhost:8080'

```

## Variable hasura graphql :

```

DATABASE_URL
HASURA_GRAPHQL_ADMIN_SECRET
HASURA_GRAPHQL_JWT_SECRET
HASURA_GRAPHQL_UNAUTHORIZED_ROLE

```

### Type vs key jwt : https://www.googleapis.com/identitytoolkit/v3/relyingparty/publicKeys

```

{
   "type":"RS512",
   "key": "-----BEGIN CERTIFICATE-----
      MIIDDTCAfWgAwIBAgIJhNlZ11IDrxbMA0GCSqSIb3DQEBCwUAMCQxIjAgBgNV
      BAMTGXlc3QtaGdlLWp3C5ldS5hdXRoMC5jb20HhcNMTgwNzMwMTM1MjM1WhcN
      MzIwND3MTM1MjM1WjAkSIwIAYDVQQDExl0ZXNLWhnZS1qd3QuZXUuYXV0aDAu
      Y29tMIBIjANBgkqhkiGw0BAQEFAAOCAQ8AMIICgKCAQEA13CivdSkNzRnOnR5
      ZNiReD+AgbL7BWjRiw3RwjxRp5PYzvAGuj94yR6LRh3QybYtsMFbSg5J7fNq6
      Ld6yMpMrUu8CBOnYY456b/2jlf+Vp8vEQuKvPOOw8Ev6x7X3blcuXCELSwyL3
      AGHq9OP2RV6V6CIE863zzuYH5HDLzU35oMZqogJVRJM0+6besH6TnSTNiA7xi
      BAqFaiRNQRVi1CAUa0bkN1XRp4AFy7d63VldOsM+8QnCNHySdDr1XevVuq6DK
      LQyGexFy4niALgHV0Q7A+xP1c2G6rJomZmn4j1avnlBpU87E58JMrRHOCj+5m
      Xj22/QDAQABo0IwQDAPgNVHRMBAf8EBTADAQHMB0GA1UdDgQWBBT6FvNkuUgu
      tk3OYQi4lo5aOgwazAOgNVHQ8BAf8EBAMCAoQDQYJKoZIhvcNAQELBQADggEB
      ADCLj+L22pEKyqaIUlhUJh7DAiDSLafy0fw56CntzPhqiZVVRlhxeAKidkCLV
      r9IEbRuxUoXiQSezPqM//9xHegMp0f2VauVCFg7EpUanYwvqFqjy9LWgH+SBz
      4uroLSZ5g1EPsHtlArLChA90caTX4e7Z7Xlu8G2kHRJB5nC7ycdbMUvEWBMeI
      tn/pcbmZ3/vlgj4UTEnURe2UPmSJpxmPwXqBcvwdKHRMgFXhZxojWCi0z4ftf
      f8t8UJIcbEblnkYe7wzYy8tOXoMMHqGSisCdkp/866029rJsKbwd8rVIyKNC5
      frGYaw+0cxO6/WvSir0eA=
      -----END CERTIFICATE-----
      "
}

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
