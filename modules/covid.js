const mongoose = require('mongoose');

const Schema = mongoose.Schema;
let CovidSchema = new Schema({
  '0': {
    confirmed: Number,
    recovered: Number,
    deaths: Number,
    negative: Number,
    updated_at: Date
  },
  '1': {
    type: ['Mixed']
  }
});

// Export the model
module.exports = mongoose.model('Covid', CovidSchema);
