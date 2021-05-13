"use strict";

var express = require('express');

var app = express();
var PORT = 5000 || process.env.PORT;

var userRouter = require('./src/routers/user');

var detailsRouter = require('./src/routers/details');

var cors = require('cors');

require('./src/db/mongoose');

app.use(cors());
app.use(express.json());
app.use(userRouter);
app.use(detailsRouter);
app.listen(PORT, function () {
  console.log("Server is up on port: ".concat(PORT));
});