require('dotenv').config();
const mongoose = require('mongoose');
const cron = require('node-cron');
const express = require('express');
const cors = require('cors');
const app = express();
const Covid = require('./modules/covid');
const {
  SOURCE_URL,
  DB_URL,
  GITHUB_URL,
  PORT,
  coordinates
} = require('./lib/config');
const { merge } = require('./lib/helpers');

const scraper = require('./subscribers/scraper');
// MiddleWeares
app.use(express.static('public'));
app.options('*', cors());

// Endpoint
app.get('/api', cors(), async (req, res) => {
  const covidData = await Covid.findOne({ _id: '5e7a0e76ed7c2e1a4460268a' });
  const response = covidData._doc;
  res.json({
    country: 'Morocco',
    latest: response[0],
    regions: merge(coordinates, response[1]),
    github: GITHUB_URL
  });
});
app.listen(PORT, () => console.log(`Example app listening on PORT ${PORT}!`));

// Connect To DB
mongoose
  .connect(DB_URL, {
    useUnifiedTopology: true,
    useNewUrlParser: true,
    useFindAndModify: false
  })
  .then(() => console.log('DB Connected!'))
  .catch(err => {
    console.log(`DB Connection Error: ${err.message}`);
  });

cron.schedule('*/15 * * * *', () => {
  scraper.scrapeData(SOURCE_URL);
  console.log('running this task every 15 minute');
});
