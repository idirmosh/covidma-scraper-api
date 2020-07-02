const redis = require('redis');
const { REDIS } = require('../lib/config');

const client = redis.createClient({
  port: REDIS.port,
  host: REDIS.host,
  password: REDIS.password
});

module.exports = client;
