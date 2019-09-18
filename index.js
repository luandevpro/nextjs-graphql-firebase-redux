const express = require('express');
const next = require('next');
const { parse } = require('url');
const { join } = require('path');
const compression = require('compression');

require('dotenv').config();

const port = process.env.PORT || 8080;
const dev = process.env.NODE_ENV !== 'production';
const app = next({ dev });
const handle = app.getRequestHandler();
const cookieParser = require('cookie-parser');
const passport = require('passport');
const sitemapAndRobots = require('./server/utils/sitemapAndRobots');
const routes = require('./server/routes');

app
  .prepare()
  .then(() => {
    const server = express();
    server.use(compression());

    server.get('/service-worker.js', (req, res) => {
      const parsedUrl = parse(req.url, true);
      const { pathname } = parsedUrl;
      if (pathname === '/service-worker.js') {
        const filePath = join(__dirname, '.next', pathname);
        app.serveStatic(req, res, filePath);
      } else {
        handle(req, res, parsedUrl);
      }
    });

    server.use(express.json());
    server.use(cookieParser('coder9s'));
    server.use(passport.initialize());

    sitemapAndRobots({ server });

    server.use('/', routes);
    server.get('*', (req, res) => handle(req, res));

    server.listen(port, (err) => {
      if (err) throw err;
      console.log('> Ready on https://localhost:8080');
    });
  })
  .catch((ex) => {
    console.error(ex.stack);
    process.exit(1);
  });
