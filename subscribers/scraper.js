const puppeteer = require('puppeteer');
const { xPaths } = require('../lib/config');
const db = require('./dbupdater');

const scrapeData = async url => {
  const browser = await puppeteer.launch({ args: ['--no-sandbox'] });
  const page = await browser.newPage();
  await page.goto(url);

  const activeCasesXPath = await page.$x(xPaths.active);
  const recoveredXPath = await page.$x(xPaths.recovered);
  const deathsXPath = await page.$x(xPaths.deaths);
  const closedCasesXPath = await page.$x(xPaths.closed);
  const dateXPath = await page.$x(xPaths.date);

  let confirmed = await page.evaluate(
    active => active.textContent,
    activeCasesXPath[0]
  );
  let recovered = await page.evaluate(
    recovered => recovered.textContent,
    recoveredXPath[0]
  );
  let deaths = await page.evaluate(
    deaths => deaths.textContent,
    deathsXPath[0]
  );
  let negative = await page.evaluate(
    closed => closed.textContent,
    closedCasesXPath[0]
  );

  let updated_at = await page.evaluate(date => date.textContent, dateXPath[0]);

  const data = await page.evaluate(() => {
    const selector =
      '#WebPartWPQ2 > div.ms-rtestate-field > table > tbody:nth-child(1) > tr';
    const tds = Array.from(document.querySelectorAll(selector));
    return tds.map(td => {
      const tdTrimed = td.textContent.trim();
      const tdCleaned = tdTrimed.replace(/\s+/g, ' ').split(/(\d+)/);
      const regionalData = {
        region: tdCleaned[0],
        cases: tdCleaned[1]
      };
      console.log(regionalData);
      return regionalData;
    });
  });
  data.splice(0, 1);
  const status = [
    {
      confirmed: parseInt(confirmed),
      recovered: parseInt(recovered),
      deaths: parseInt(deaths),
      negative: parseInt(negative),
      updated_at
    },
    [...data]
  ];

  await browser.close();
  db.update('5e7a0e76ed7c2e1a4460268a', status);
};

module.exports.scrapeData = scrapeData;
