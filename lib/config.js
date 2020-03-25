const DB_URL = process.env.DB_URL;
const SOURCE_URL = 'http://www.covidmaroc.ma/Pages/Accueil.aspx';
const GITHUB_URL = 'https://github.com/iddify';
const PORT = process.env.PORT || 5000;
const REDIS = {
  port: process.env.REDIS_PORT,
  password: process.env.REDIS_PASSWORD,
  host: process.env.REDIS_HOST
};

const xPaths = {
  confirmed:
    '#WebPartWPQ1 > div.ms-rtestate-field > div:nth-child(1) > table > tbody > tr:nth-child(2) > td:nth-child(2) > p',
  recovered:
    '#WebPartWPQ1 > div.ms-rtestate-field > div:nth-child(1) > table > tbody > tr:nth-child(2) > td:nth-child(1) > p:nth-child(1)',
  deaths:
    '#WebPartWPQ1 > div.ms-rtestate-field > div:nth-child(1) > table > tbody > tr:nth-child(2) > td:nth-child(1) > p:nth-child(1)',
  negative:
    '#WebPartWPQ1 > div.ms-rtestate-field > div:nth-child(1) > table > tbody > tr:nth-child(2) > td:nth-child(3) > p',
  date:
    '#WebPartWPQ1 > div.ms-rtestate-field > div:nth-child(1) > table > tbody > tr:nth-child(1) > td > p > font',
  tableSelector:
    'document.querySelector("#WebPartWPQ2 > div.ms-rtestate-field > table > tbody:nth-child(1) > tr.ms-rteTableHeaderRow-6")'
};

const coordinates = [
  {
    region: 'Beni Mellal-Khénifra​',
    latitude: '32.4625395',
    longitude: '-6.3543282'
  },
  {
    region: 'Casa Settat',
    latitude: '33.5883102',
    longitude: '-7.6113801'
  },
  {
    region: '​​Daraa-tafilalet ​',
    latitude: '31.1835432',
    longitude: '-5.1395435'
  },
  {
    region: 'Dakhla-Oued Ed Dahab​',
    latitude: '23.28371',
    longitude: '-15.0202622'
  },
  {
    region: 'Fès meknes',
    latitude: '33.8333136',
    longitude: '-4.8556382'
  },
  {
    region: 'Guelmim Oued Noun',
    latitude: '28.5273703',
    longitude: '-10.0315515'
  },
  {
    region: 'Laâyoune-Sakia El Hamra',
    latitude: '27.1500384',
    longitude: '-13.1990758'
  },
  {
    region: 'Marrakech Safi',
    latitude: '31.6048574',
    longitude: '-8.3654032'
  },
  {
    region: 'Oriental ​',
    latitude: '33.3202138',
    longitude: '-2.4238471'
  },
  {
    region: 'Rabat Salé Kenitra',
    latitude: '33.9204332',
    longitude: '-6.3676093'
  },
  {
    region: 'Souss-Massa',
    latitude: '30.187722',
    longitude: '-8.6322498'
  },
  {
    region: 'Tanger Tetouan Al Hoceima',
    latitude: '35.202941',
    longitude: '-5.5510167'
  }
];

module.exports = {
  DB_URL,
  SOURCE_URL,
  GITHUB_URL,
  PORT,
  coordinates,
  xPaths,
  REDIS
};
