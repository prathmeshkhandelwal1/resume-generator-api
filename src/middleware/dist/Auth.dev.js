"use strict";

var jwt = require('jsonwebtoken');

var User = require('../models/User');

var auth = function auth(req, res, next) {
  var token, decoded, user;
  return regeneratorRuntime.async(function auth$(_context) {
    while (1) {
      switch (_context.prev = _context.next) {
        case 0:
          _context.prev = 0;
          token = req.header('Authorization').replace('Bearer ', '');
          console.log(token);
          decoded = jwt.verify(token, 'console.log');
          console.log(decoded);
          _context.next = 7;
          return regeneratorRuntime.awrap(User.findOne({
            _id: decoded._id,
            'tokens.token': token
          }));

        case 7:
          user = _context.sent;
          console.log(user);

          if (user) {
            _context.next = 11;
            break;
          }

          throw new Error();

        case 11:
          req.user = user;
          next();
          _context.next = 18;
          break;

        case 15:
          _context.prev = 15;
          _context.t0 = _context["catch"](0);
          res.status(401).send('Plz Authorize');

        case 18:
        case "end":
          return _context.stop();
      }
    }
  }, null, null, [[0, 15]]);
};

module.exports = auth;