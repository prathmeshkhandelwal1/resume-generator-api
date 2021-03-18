"use strict";

var express = require('express');

var router = new express.Router();

var User = require('../models/User');

var bcrypt = require('bcryptjs');

var auth = require('../middleware/Auth');

router.post('/register', function _callee(req, res) {
  var user, token;
  return regeneratorRuntime.async(function _callee$(_context) {
    while (1) {
      switch (_context.prev = _context.next) {
        case 0:
          user = new User(req.body);
          _context.prev = 1;
          _context.next = 4;
          return regeneratorRuntime.awrap(user.generateAuthToken());

        case 4:
          token = _context.sent;
          _context.next = 7;
          return regeneratorRuntime.awrap(user.save());

        case 7:
          res.send({
            user: user,
            token: token
          });
          _context.next = 13;
          break;

        case 10:
          _context.prev = 10;
          _context.t0 = _context["catch"](1);
          res.status(400).send(_context.t0);

        case 13:
        case "end":
          return _context.stop();
      }
    }
  }, null, null, [[1, 10]]);
});
router.post('/users/login', function _callee2(req, res) {
  var user, token;
  return regeneratorRuntime.async(function _callee2$(_context2) {
    while (1) {
      switch (_context2.prev = _context2.next) {
        case 0:
          _context2.prev = 0;
          _context2.next = 3;
          return regeneratorRuntime.awrap(User.findByCredentials(req.body.email, req.body.password));

        case 3:
          user = _context2.sent;
          _context2.next = 6;
          return regeneratorRuntime.awrap(user.generateAuthToken());

        case 6:
          token = _context2.sent;
          _context2.next = 9;
          return regeneratorRuntime.awrap(user.save());

        case 9:
          res.send({
            user: user,
            token: token
          });
          _context2.next = 15;
          break;

        case 12:
          _context2.prev = 12;
          _context2.t0 = _context2["catch"](0);
          res.status(400).send(_context2.t0);

        case 15:
        case "end":
          return _context2.stop();
      }
    }
  }, null, null, [[0, 12]]);
});
router.get('/users/me', auth, function _callee3(req, res) {
  return regeneratorRuntime.async(function _callee3$(_context3) {
    while (1) {
      switch (_context3.prev = _context3.next) {
        case 0:
          res.send(req.user);

        case 1:
        case "end":
          return _context3.stop();
      }
    }
  });
});
router.get('/users/:id', function _callee4(req, res) {
  var _id, user;

  return regeneratorRuntime.async(function _callee4$(_context4) {
    while (1) {
      switch (_context4.prev = _context4.next) {
        case 0:
          _id = req.params.id;
          _context4.prev = 1;
          _context4.next = 4;
          return regeneratorRuntime.awrap(User.findById(_id));

        case 4:
          user = _context4.sent;

          if (user) {
            _context4.next = 7;
            break;
          }

          return _context4.abrupt("return", res.status(404).send());

        case 7:
          res.send(user);
          _context4.next = 13;
          break;

        case 10:
          _context4.prev = 10;
          _context4.t0 = _context4["catch"](1);
          res.status(400).send();

        case 13:
        case "end":
          return _context4.stop();
      }
    }
  }, null, null, [[1, 10]]);
});
router.patch('/users/:id', function _callee5(req, res) {
  var updates, allowedUpdates, isValid, user;
  return regeneratorRuntime.async(function _callee5$(_context5) {
    while (1) {
      switch (_context5.prev = _context5.next) {
        case 0:
          updates = Object.keys(req.body);
          allowedUpdates = ['name', 'email', 'password'];
          isValid = updates.every(function (update) {
            return allowedUpdates.includes(update);
          });

          if (isValid) {
            _context5.next = 5;
            break;
          }

          return _context5.abrupt("return", res.status(400).send({
            error: 'Invalid argument'
          }));

        case 5:
          _context5.prev = 5;
          _context5.next = 8;
          return regeneratorRuntime.awrap(User.findById(req.params.id));

        case 8:
          user = _context5.sent;
          updates.forEach(function (update) {
            return user[update] = req.body[update];
          });
          _context5.next = 12;
          return regeneratorRuntime.awrap(user.save());

        case 12:
          if (user) {
            _context5.next = 14;
            break;
          }

          return _context5.abrupt("return", res.status(404).send());

        case 14:
          res.send(user);
          _context5.next = 20;
          break;

        case 17:
          _context5.prev = 17;
          _context5.t0 = _context5["catch"](5);
          res.status(400).send();

        case 20:
        case "end":
          return _context5.stop();
      }
    }
  }, null, null, [[5, 17]]);
});
module.exports = router;