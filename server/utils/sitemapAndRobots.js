const sm = require('sitemap');
const path = require('path');
const { graphqlClient } = require('../configs/graphqlClient');
const { users } = require('../graphql/users/query');

const sitemap = sm.createSitemap({
  hostname: process.env.DOMAIN_TO_CREATE_SITEMAP,
  cacheTime: 600000, // 600 sec - cache purge period
});

function setup({ server }) {
  graphqlClient.request(users).then((data) => {
    data.users.forEach((user) => {
      sitemap.add({
        url: `/user/${user.userId}`,
        changefreq: 'daily',
        priority: 1,
      });
    });
  });

  server.get('/sitemap.xml', (req, res) => {
    res.header('Content-Type', 'application/xml');
    res.send(sitemap.toXML());
  });

  server.get('/robots.txt', (req, res) => {
    res.sendFile(path.join(__dirname, '../utils', 'robots.txt'));
  });
}

module.exports = setup;
