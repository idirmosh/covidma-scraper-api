require('dotenv').config();
const cron = require('node-cron');
const express = require('express');
const cors = require('cors');
const app = express();
const { SOURCE_URL, PORT } = require('./lib/config');
const client = require('./subscribers/redis');
const scraper = require('./subscribers/scraper');

// middlewares
app.use(express.static('public'));
app.options('*', cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Endpoints
app.get('/api', cors(), async (req, res) => {
  client.get('data', (err, value) => {
    if (err) throw err;
    else res.json(JSON.parse(value));
  });
});

app.get('/api/:region', cors(), async (req, res) => {
  const regionCode = req.params.region;
  client.get('data', (err, value) => {
    if (err) throw err;
    else {
      const regions = JSON.parse(value)[1];
      const matchedRegion = regions.filter(reg => reg.regionCode.toUpperCase() === regionCode.toUpperCase())[0];
      matchedRegion 
        ? res.status(200).json(matchedRegion)
        : res.status(404).send({ error: 'Not Found!' }); // in case matchedRegion is undefined
    }
  });
});

app.listen(PORT, () => console.log(`Example app listening on PORT ${PORT}!`));

cron.schedule('*/15 * * * *', () => {
  scraper.scrapeData(SOURCE_URL);
  console.log('running this task every 15 minute');
});

 scraper.scrapeData(SOURCE_URL);
