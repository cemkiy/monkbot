const mongoose = require('mongoose')

// Hourly Schema
const Prediction = mongoose.Schema({
  price: {
    type: Number
  },
  message_id: {
    type: String
  },
  created_at: {
    type: Date,
    default: Date.now
  }
})

module.exports.Hourly = mongoose.model('Hourly', Prediction)
module.exports.Daily = mongoose.model('Daily', Prediction)
module.exports.Weekly = mongoose.model('Weekly', Prediction)
module.exports.Montly = mongoose.model('Montly', Prediction)
