const jsdom = require('jsdom');

const got = require('got');
const UserAgent = require('user-agents');
const { JSDOM } = jsdom;
const { coordinates, xPaths } = require('../lib/config');
const { parsDate, merge } = require('../lib/helpers');
const client = require('./redis');
const userAgent = new UserAgent();

const scrapeData = async url => {
  try {
    const event = await got(url, {
      headers: { 'User-Agent': userAgent }
    });
    const eventDom = new JSDOM(event.body.toString()).window.document;
    const confirmed = eventDom.querySelector(xPaths.confirmed).textContent;
    const recovered = eventDom.querySelector(xPaths.recovered).textContent;
    const deaths = eventDom.querySelector(xPaths.deaths).textContent.split('');
    const a = deaths[0] + deaths[1];
    const d = deaths[2] + deaths[3];
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
        cases: parseInt(cases.textContent.replace(/\u200B/g, ''))
      });
    });
    const data = [
      {
        confirmed: parseInt(confirmed),
        recovered: parseInt(a),
        deaths: parseInt(d),
        negative: parseInt(negative),
        last_updated: parsDate(date)
      },
      [...merge(regionalData, coordinates)]
    ];
    client.set('data', JSON.stringify(data), function(err) {
      if (err) throw err;
    });
  } catch (err) {
    console.log(err);
  }
};

module.exports.scrapeData = scrapeData;
