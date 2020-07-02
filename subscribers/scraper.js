const { xPaths } = require("../lib/config");
const { parsDate } = require("../lib/helpers");
const client = require("./redis");
const osmosis = require("osmosis");

const scrapeData = async (url) => {
  const getCases = scrap(url, "/html/body", {
    confirmed: xPaths.confirmed,
    new_confirmed: xPaths.newConfirmed,
    recovering: xPaths.recovering,
    new_recovering: xPaths.newRecovering,
    receivingTrreatment: xPaths.receivingTrreatment,
    new_receivingTrreatment: xPaths.newReceivingTrreatment,
    deaths: xPaths.deaths,
    new_deaths: xPaths.newDeaths,
    excluded: xPaths.excluded,
    new_excluded: xPaths.newExcluded,
    last_updated: xPaths.date,
  });
  const getRegions = scrap(url, ".table > tbody", {
    "Casablanca Settat": "tr[1] > td[1]",
    "Tanger-Tetouan-Al Hoceima": "tr[2] > td[1]",
    "Marrakech-Safi": "tr[3] > td[1]",
    "Rabat-Salé-Kénitra": "tr[4] > td[1]",
    "Fès-Meknès": "tr[5] > td[1]",
    "Laâyoune-Sakia El Hamra": "tr[6] > td[1]",
    "Drâa Tafilalet": "tr[7] > td[1]",
    "Oriental Region": "tr[8] > td[1]",
    "Béni Mellal-Khénifra": "tr[9] > td[1]",
    "Souss-Massa": "tr[10] > td[1]",
    "Guelmim-Oued Noun": "tr[11] > td[1]",
    "Dakhla-Oued Ed-Dahab": "tr[12] > td[1]",
  });

  Promise.all([getCases, getRegions]).then((values) => {
    const [cases, regions] = values;
    const data = [
      {
        confirmed: parseInt(cases.confirmed),
        new_confirmed: parseInt(cases.new_confirmed) || 0,
        recovering: parseInt(cases.recovering),
        new_recovering: parseInt(cases.new_recovering) || 0,
        receivingTrreatment: parseInt(cases.receivingTrreatment),
        new_receivingTrreatment: parseInt(cases.new_receivingTrreatment) || 0,
        deaths: parseInt(cases.deaths),
        new_deaths: parseInt(cases.new_death) || 0,
        excluded: parseInt(cases.excluded),
        new_excluded: parseFloat(cases.new_excluded) || 0,
        last_updated: parsDate(cases.last_updated),
      },
      [regions],
    ];
    client.set("data", JSON.stringify(data), function (err) {
      if (err) throw err;
    });
  });
};

const scrap = (url, root, set) => {
  return new Promise((resolve, reject) => {
    let data;
    return osmosis
      .get(url)
      .find(root)
      .set(set)
      .data((res) => {
        data = res;
        resolve(data);
      })
      .done();
  });
};

module.exports.scrapeData = scrapeData;
