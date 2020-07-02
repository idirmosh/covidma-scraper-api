require("dotenv").config();
const cron = require("node-cron");
const express = require("express");
const cors = require("cors");
const app = express();
const { SOURCE_URL, PORT } = require("./lib/config");
const client = require("./subscribers/redis");
const scraper = require("./subscribers/scraper");

// middlewares
app.use(express.static("public"));
app.options("*", cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Endpoints
app.get("/api", cors(), async (req, res) => {
  client.get("data", (err, value) => {
    if (err) throw err;
    else res.json(JSON.parse(value));
  });
});
///

app.listen(PORT, () => console.log(`Example app listening on PORT ${PORT}!`));

cron.schedule("0 * * * *", () => {
  console.log("running this task every 1 hour");
  scraper.scrapeData(SOURCE_URL);
});
