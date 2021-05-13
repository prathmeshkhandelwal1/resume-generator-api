"use strict";

var express = require("express");

var router = new express.Router();

var User = require("../models/User");

var bcrypt = require("bcryptjs");

var auth = require("../middleware/Auth");

router.post("/register", function _callee(req, res) {
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
          // await user.save()
          res.send({
            user: user,
            token: token
          });
          _context.next = 11;
          break;

        case 8:
          _context.prev = 8;
          _context.t0 = _context["catch"](1);
          res.status(400).send(_context.t0);

        case 11:
        case "end":
          return _context.stop();
      }
    }
  }, null, null, [[1, 8]]);
});
router.post("/users/logout", auth, function _callee2(req, res) {
  return regeneratorRuntime.async(function _callee2$(_context2) {
    while (1) {
      switch (_context2.prev = _context2.next) {
        case 0:
          _context2.prev = 0;
          req.user.tokens = req.user.tokens.filter(function (token) {
            return token.token !== req.token;
          });
          _context2.next = 4;
          return regeneratorRuntime.awrap(req.user.save());

        case 4:
          res.send();
          _context2.next = 10;
          break;

        case 7:
          _context2.prev = 7;
          _context2.t0 = _context2["catch"](0);
          res.status(400).send('Something went wrong');

        case 10:
        case "end":
          return _context2.stop();
      }
    }
  }, null, null, [[0, 7]]);
});
router.post("/users/login", function _callee3(req, res) {
  var user, token;
  return regeneratorRuntime.async(function _callee3$(_context3) {
    while (1) {
      switch (_context3.prev = _context3.next) {
        case 0:
          _context3.prev = 0;
          _context3.next = 3;
          return regeneratorRuntime.awrap(User.findByCredentials(req.body.email, req.body.password));

        case 3:
          user = _context3.sent;
          _context3.next = 6;
          return regeneratorRuntime.awrap(user.generateAuthToken());

        case 6:
          token = _context3.sent;
          // await user.save()
          res.send({
            user: user,
            token: token
          });
          _context3.next = 13;
          break;

        case 10:
          _context3.prev = 10;
          _context3.t0 = _context3["catch"](0);
          res.status(400).send(_context3.t0);

        case 13:
        case "end":
          return _context3.stop();
      }
    }
  }, null, null, [[0, 10]]);
});
router.get("/users/me", auth, function _callee4(req, res) {
  return regeneratorRuntime.async(function _callee4$(_context4) {
    while (1) {
      switch (_context4.prev = _context4.next) {
        case 0:
          res.send(req.user);

        case 1:
        case "end":
          return _context4.stop();
      }
    }
  });
});
router["delete"]("/users/me", auth, function _callee5(req, res) {
  return regeneratorRuntime.async(function _callee5$(_context5) {
    while (1) {
      switch (_context5.prev = _context5.next) {
        case 0:
          _context5.prev = 0;
          _context5.next = 3;
          return regeneratorRuntime.awrap(req.user.remove());

        case 3:
          res.send(req.user);
          _context5.next = 9;
          break;

        case 6:
          _context5.prev = 6;
          _context5.t0 = _context5["catch"](0);
          res.status(400).send();

        case 9:
        case "end":
          return _context5.stop();
      }
    }
  }, null, null, [[0, 6]]);
});
router.patch("/users/me", auth, function _callee6(req, res) {
  var updates, allowedUpdates, isValid;
  return regeneratorRuntime.async(function _callee6$(_context6) {
    while (1) {
      switch (_context6.prev = _context6.next) {
        case 0:
          updates = Object.keys(req.body);
          allowedUpdates = ["name", "email", "password"];
          isValid = updates.every(function (update) {
            return allowedUpdates.includes(update);
          });

          if (isValid) {
            _context6.next = 5;
            break;
          }

          return _context6.abrupt("return", res.status(400).send({
            error: "Invalid argument"
          }));

        case 5:
          _context6.prev = 5;
          updates.forEach(function (update) {
            return req.user[update] = req.body[update];
          });
          _context6.next = 9;
          return regeneratorRuntime.awrap(req.user.save());

        case 9:
          res.send(req.user);
          _context6.next = 15;
          break;

        case 12:
          _context6.prev = 12;
          _context6.t0 = _context6["catch"](5);
          res.status(400).send();

        case 15:
        case "end":
          return _context6.stop();
      }
    }
  }, null, null, [[5, 12]]);
});
module.exports = router;