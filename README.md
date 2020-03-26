# covidma-scraper-api

💥 Simple web scrapper using Puppeteer. Scrape covid19/coronavirus data from covidmaroc website.

## Usage

Get all data.

```javascript
/api
```

Get signle region by providing region code.

```javascript
/api/:regionCode // Ex: /api/SM
```

## TODOS

- DateTime Support [✔]
- Use JSDOM instead of puppeteer [✔]
- Remove mongodb and use redis instead [✔]
- Add api route for specific regions [✔]
