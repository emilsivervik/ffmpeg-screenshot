'use strict';

const express = require('express');
const app = express();

const port = process.env.PORT || 1233;

const routes = require('./routes');

app.use('/', routes);

app.listen(port)