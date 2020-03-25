const Covid = require('../modules/covid');

const db = async (id, data) => {
  const newData = new Covid(data);

  // newData.save(function(err, data) {
  //   if (err) return console.error(err);
  //   console.log(data + ' saved to bookstore collection.');
  // });

  Covid.findOneAndUpdate(
    { _id: id },
    {
      $set: {
        [0]: {
          confirmed: parseInt(newData[0].confirmed),
          recovered: parseInt(newData[0].recovered),
          deaths: parseInt(newData[0].deaths),
          negative: parseInt(newData[0].negative),
          updated_at: newData[0].updated_at
        },
        [1]: [...newData[1]]
      }
    },
    (err, doc) => {
      if (err) return console.log(err);
      console.log('DB Updated!');
    }
  );
};
module.exports.update = db;
