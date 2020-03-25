const jsdom = require('jsdom');
const got = require('got');
const { JSDOM } = jsdom;
const { coordinates, xPaths } = require('../lib/config');
const { parsDate, merge } = require('../lib/helpers');
const client = require('./redis');

const scrapeData = async url => {
  const event = await got(url);
  const eventDom = new JSDOM(event.body.toString()).window.document;
  const confirmed = await eventDom.querySelector(xPaths.confirmed).textContent;
  const recovered = eventDom.querySelector(xPaths.recovered).textContent[0];
  const deaths = eventDom.querySelector(xPaths.deaths).textContent[1];
  const negative = eventDom.querySelector(xPaths.negative).textContent;
  const date = eventDom.querySelector(xPaths.date).textContent;
  const regionTable = eventDom.querySelectorAll('tr');
  let regionalData = [];
  regionTable.forEach(event => {
    let region = event.querySelector('.ms-rteTableFirstCol-6');
    let cases = event.querySelector('.ms-rteTableOddCol-6');
    if (region === null) return;
    regionalData.push({
      region: region.textContent.trim(),
      cases: cases.textContent.trim()
    });
  });

  const data = [
    {
      confirmed: parseInt(confirmed),
      recovered: parseInt(recovered),
      deaths: parseInt(deaths),
      negative: parseInt(negative),
      last_updated: parsDate(date)
    },
    [...merge(regionalData, coordinates)]
  ];

  client.set('data', JSON.stringify(data), function(err) {
    if (err) {
      throw err;
    }
  });
};

module.exports.scrapeData = scrapeData;
