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

const Hourly = module.exports = mongoose.model('Hourly', Prediction)
const Daily = module.exports = mongoose.model('Daily', Prediction)
const Weekly = module.exports = mongoose.model('Weekly', Prediction)
const Montly = module.exports = mongoose.model('Montly', Prediction)
