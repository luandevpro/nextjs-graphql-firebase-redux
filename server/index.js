const express = require('express');
const next = require('next');
const fs = require('fs');
const https = require('https');
const path = require('path');

require('dotenv').config();

const port = process.env.PORT || 8080;
const dev = process.env.NODE_ENV !== 'production';
const app = next({ dev });
const handle = app.getRequestHandler();
const cookieParser = require('cookie-parser');
const passport = require('passport');
const routes = require('./routes');

app
  .prepare()
  .then(() => {
    const server = express();
    server.use(express.json());
    server.use(cookieParser('coder9s'));
    server.use(passport.initialize());
    server.use('/', routes);
    server.get('*', (req, res) => handle(req, res));

    https
      .createServer(
        {
          key: fs.readFileSync(path.resolve('../../server.key')),
          cert: fs.readFileSync(path.resolve('../../server.cert')),
        },
        server,
      )
      .listen(port, (err) => {
        if (err) throw err;
        console.log('> Ready on https://localhost:8080');
      });
  })
  .catch((ex) => {
    console.error(ex.stack);
    process.exit(1);
  });
