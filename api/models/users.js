var mongoose = require('mongoose'),
  uuid = require('uuid'),
  Bcrypt = require('bcrypt'),
  Schema = mongoose.Schema;

var UsersSchema = new Schema({
  _id: {
    type: String,
    default: uuid.v4
  },
  accountId: {
    type: String,
    required: true
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
  },
  username: {
    type: String,
    required: true
  },
  password: {
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

  if (!this.isModified('password'))
    return next();
  var salt = Bcrypt.genSaltSync(10);
  this.password = Bcrypt.hashSync(this.password, salt);
  next();
});

module.exports = mongoose.model('Users', UsersSchema)
