var mongoose = require('mongoose'),
  uuid = require('uuid'),
  Schema = mongoose.Schema;

var ChecksSchema = new Schema({
  _id: {
    type: String,
    default: uuid.v4
  },
  checker_id: {
    type: String
  },
  result: {
    type: String,
    enum: [
      'pass', 'warn', 'fail'
    ]
  },
  message: {
    type: String,
    validate: [
      function (m) {
        return m.length < 140;
      },
      'message too long'
    ]
  }
}, {
  collection: 'checks'
});

module.exports = mongoose.model('Checks', ChecksSchema)
