var mongoose = require('mongoose'),
  uuid = require('uuid'),
  Schema = mongoose.Schema;

var validResults = [
  'pass',
  'warn',
  'fail',
  'new'
];

var ChecksSchema = new Schema({
  _id: {
    type: String,
    default: uuid.v4
  },
  account: {
    type: String,
    required: true
  },
  tags: {
    type: [String],
    default: []
  },
  created: {
    type: Date
  },
  updated: {
    type: Date
  },
  result: {
    type: String,
    default: 'new',
    enum: validResults
  },
  message: {
    type: String,
    default: ''
  },
  name: {
    type: String,
    default: ''
  }
}, {
  collection: 'checks'
});

ChecksSchema.pre('save', function (next) {
  var now = new Date();
  this.updated = now;
  this.created = this.created || now;
  this.message = this.message.substr(0, 140);
  this.name = this.name.substr(0, 140);
  next();
});

module.exports = mongoose.model('Checks', ChecksSchema)
