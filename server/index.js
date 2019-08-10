const express = require('express');
const next = require('next');

const dev = process.env.NODE_ENV !== 'production';
const app = next({ dev });
const handle = app.getRequestHandler();
const cookieParser = require('cookie-parser');
const admin = require('firebase-admin');

const serviceAccount = require('./serviceAccountKey.json');
const routes = require('./routes');

admin.initializeApp({
  credential: admin.credential.cert(serviceAccount),
  databaseURL: 'https://next-node-hasura-graphql.firebaseio.com',
});

app
  .prepare()
  .then(() => {
    const server = express();
    server.use(express.json());
    server.use(cookieParser('coder9s'));
    server.use('/', routes);
    server.get('*', (req, res) => handle(req, res));

    server.listen(3000, (err) => {
      if (err) throw err;
      console.log('> Ready on http://localhost:3000');
    });
  })
  .catch((ex) => {
    console.error(ex.stack);
    process.exit(1);
  });
