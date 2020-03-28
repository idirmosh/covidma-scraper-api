const osmosis = require('osmosis');

const scrapeData = async url => {
  osmosis
    .get(url)
    .find(
      '//*[@id="WebPartWPQ1"]/div[1]/div[1]/table/tbody/tr[2]/td[1]/p[1]/span'
    )
    .done(function() {
      assert.ok(count == 2);
      assert.done();
    });
  console.log(sdqs);
};
scrapeData('www.google.com');
