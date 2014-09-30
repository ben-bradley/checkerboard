var mongoose = require('mongoose'),
  uuid = require('uuid'),
  Schema = mongoose.Schema;

var UsersSchema = new Schema({
  _id: {
    type: String,
    default: uuid.v4
  },
  accountId: {
    type: String
  },
  created: {
    type: Date
  },
  updated: {
    type: Date
  },
  firstName: {
    type: String,
    required: true
  },
  lastName: {
    type: String,
    required: true
  },
  email: {
    type: String,
    required: true
  }
}, {
  collection: 'users'
});

UsersSchema.pre('save', function (next) {
  var now = new Date();
  this.updated = now;
  this.created = this.created || now;
  next();
});

module.exports = mongoose.model('Users', UsersSchema)
