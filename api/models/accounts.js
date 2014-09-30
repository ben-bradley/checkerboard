var mongoose = require('mongoose'),
  uuid = require('uuid'),
  Schema = mongoose.Schema;

var AccountsSchema = new Schema({
  _id: {
    type: String,
    default: uuid.v4
  },
  secret: {
    type: String,
    default: uuid.v4
  },
  checks: {
    type: [String],
    default: []
  },
  checkLimit: {
    type: Number,
    default: 10
  },
  userLimit: {
    type: Number,
    default: 10
  },
  created: {
    type: Date
  },
  updated: {
    type: Date
  },
  name: {
    type: String,
    required: true
  }
}, {
  collection: 'accounts'
});

AccountsSchema.pre('save', function (next) {
  var now = new Date();
  this.updated = now;
  this.created = this.created || now;
  this.name = this.name.substr(0, 140);
  next();
});

module.exports = mongoose.model('Accounts', AccountsSchema)
