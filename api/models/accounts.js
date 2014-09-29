var mongoose = require('mongoose'),
  uuid = require('uuid'),
  Schema = mongoose.Schema;

var AccountsSchema = new Schema({
  _id: {
    type: String,
    default: uuid.v4
  },
  checks: {
    type: [String]
  },
  created: {
    type: Date
  },
  updated: {
    type: Date
  },
  check_limit: {
    type: Number,
    default: 10
  },
  name: {
    type: String,
    default: ''
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
