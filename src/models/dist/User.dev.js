"use strict";

var mongoose = require('mongoose');

var validator = require('validator');

var bcrypt = require('bcryptjs');

var jwt = require('jsonwebtoken');

var userSchema = mongoose.Schema({
  name: {
    type: String,
    required: true,
    trim: true
  },
  email: {
    type: String,
    required: true,
    unique: true,
    trim: true,
    lowercase: true,
    validate: function validate(value) {
      if (!validator.isEmail(value)) {
        throw new Error('Email is invalid!');
      }
    }
  },
  password: {
    type: String,
    required: true,
    trim: true,
    minlength: 6,
    validate: function validate(value) {
      if (value === "password") {
        throw new Error("Password is invalid!");
      }
    }
  },
  tokens: [{
    token: {
      type: String,
      required: true
    }
  }]
});

userSchema.statics.findByCredentials = function _callee(email, password) {
  var user, isMatch;
  return regeneratorRuntime.async(function _callee$(_context) {
    while (1) {
      switch (_context.prev = _context.next) {
        case 0:
          _context.next = 2;
          return regeneratorRuntime.awrap(User.findOne({
            email: email
          }));

        case 2:
          user = _context.sent;
          _context.next = 5;
          return regeneratorRuntime.awrap(bcrypt.compare(password, user.password));

        case 5:
          isMatch = _context.sent;

          if (isMatch) {
            _context.next = 8;
            break;
          }

          throw new Error('unable to login');

        case 8:
          return _context.abrupt("return", user);

        case 9:
        case "end":
          return _context.stop();
      }
    }
  });
}; //for generating auth tokens


userSchema.methods.generateAuthToken = function _callee2() {
  var user, token;
  return regeneratorRuntime.async(function _callee2$(_context2) {
    while (1) {
      switch (_context2.prev = _context2.next) {
        case 0:
          user = this;
          console.log(user.tokens);
          token = jwt.sign({
            _id: user._id.toString()
          }, 'console.log');
          console.log(token);
          user.tokens = user.tokens.concat({
            token: token
          });
          console.log(user.tokens);
          return _context2.abrupt("return", token);

        case 7:
        case "end":
          return _context2.stop();
      }
    }
  }, null, this);
}; // for hashing the password whenever the password will be modify.


userSchema.pre('save', function _callee3(next) {
  var user;
  return regeneratorRuntime.async(function _callee3$(_context3) {
    while (1) {
      switch (_context3.prev = _context3.next) {
        case 0:
          user = this;

          if (!user.isModified('password')) {
            _context3.next = 5;
            break;
          }

          _context3.next = 4;
          return regeneratorRuntime.awrap(bcrypt.hash(user.password, 8));

        case 4:
          user.password = _context3.sent;

        case 5:
          next();

        case 6:
        case "end":
          return _context3.stop();
      }
    }
  }, null, this);
});
var User = mongoose.model('User', userSchema);
module.exports = User;