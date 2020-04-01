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
<<<<<<< HEAD
    const getTextContent = (xPathQuery) => eventDom.querySelector(xPathQuery).textContent;
    const confirmed = getTextContent(xPaths.confirmed);
    const recovered = getTextContent(xPaths.recovered); // TODO remove/or use this unused variable
    const deaths = getTextContent(xPaths.deaths).split('');
    const a = deaths[0] + deaths[1];
    const d = deaths[2] + deaths[3];
    const negative = getTextContent(xPaths.negative);
    const date = getTextContent(xPaths.date);
    const regionTable = eventDom.querySelectorAll('tr');
    const regionalData = regionTable.map(event => {
      const region = event.querySelector('.ms-rteTableFirstCol-6');
      const cases = event.querySelector('.ms-rteTableOddCol-6');
      if (!region) return null;
      return ({
        region: region.textContent.trim(),
        cases: parseInt(cases.textContent.replace(/\u200B/g, ''))
      });
    }).filter(o => o); // Keep only not null results;
=======
    const getTextContent = xPathQuery =>
      eventDom.querySelector(xPathQuery).textContent;
    const confirmed = getTextContent(xPaths.confirmed);
    const recovered = getTextContent(xPaths.recovered);
    const deaths = getTextContent(xPaths.deaths).split('');
    const dea = deaths[0] + deaths[1];
    const rec = recovered[0] + recovered[1];
    const negative = getTextContent(xPaths.negative);
    const date = getTextContent(xPaths.date);
    const [...regionTable] = eventDom.querySelectorAll('tr');
    const regionalData = regionTable
      .map(event => {
        const region = event.querySelector('.ms-rteTableFirstCol-6');
        const cases = event.querySelector('.ms-rteTableOddCol-6');
        if (!region) return null;
        return {
          region: region.textContent.trim(),
          cases: parseInt(cases.textContent.replace(/\u200B/g, ''))
        };
      })
      .filter(o => o); // Keep only not null results;
>>>>>>> Fix #7

    const data = [
      {
        confirmed: parseInt(confirmed),
        recovered: parseInt(rec),
        deaths: parseInt(dea),
        negative: parseInt(negative),
        last_updated: parsDate(date)
      },
      [...merge(regionalData, coordinates)]
    ];
    console.log(data);
    client.set('data', JSON.stringify(data), function(err) {
      if (err) throw err;
    });
  } catch (err) {
    console.log(err);
  }
};

module.exports.scrapeData = scrapeData;
