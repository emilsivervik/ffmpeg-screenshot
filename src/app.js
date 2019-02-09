'use strict';

const express = require('express');
const app = express();
const cors = require('cors');
const compression = require('compression');

const port = process.env.PORT || 1233;

const routes = require('./routes');

app.use(compression())
app.use(cors());
app.use('/', routes);

app.listen(port)