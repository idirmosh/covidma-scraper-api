const DB_URL = process.env.DB_URL;
const SOURCE_URL = "https://covid.hespress.com/";
const GITHUB_URL = "https://github.com/iddify";
const PORT = process.env.PORT || 5000;
const REDIS = {
  port: process.env.REDIS_PORT,
  password: process.env.REDIS_PASSWORD,
  host: process.env.REDIS_HOST,
};

const xPaths = {
  confirmed: "/html/body/div[1]/div[1]/div[3]/div/div[1]/div/div[2]/h4",
  newConfirmed: "/html/body/div[1]/div[1]/div[3]/div/div[2]/div/div[2]/a/span",
  receivingTrreatment:
    "/html/body/div[1]/div[1]/div[7]/div/div[1]/div/div[2]/h4",
  newReceivingTrreatment:
    "/html/body/div[1]/div[1]/div[7]/div/div[2]/div/div[2]/a/span",
  recovering: "/html/body/div[1]/div[1]/div[5]/div/div[1]/div/div[2]/h4",
  newRecovering: "/html/body/div[1]/div[1]/div[5]/div/div[2]/div/div[2]/a/span",
  deaths: "/html/body/div[1]/div[1]/div[6]/div/div[1]/div/div[2]/h4",
  newDeaths: "/html/body/div[1]/div[1]/div[6]/div/div[2]/div/div[2]/span",
  excluded: "/html/body/div[1]/div[1]/div[4]/div/div[1]/div/div[2]/h4",
  newExcluded: "/html/body/div[1]/div[1]/div[4]/div/div[2]/div/div[2]/a/span",
  date: "/html/body/div[1]/div[1]/div[3]/div/div[2]/div/div[1]/span",
  tableSelector: "/html/body/div[1]/div[1]/div[13]/div/div[2]/table/tbody",
};

module.exports = {
  DB_URL,
  SOURCE_URL,
  GITHUB_URL,
  PORT,
  xPaths,
  REDIS,
};
