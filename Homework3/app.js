const express = require("express");
const app = express();
const api = require('./routers/api');

app.use(express.json());

app.use('/api',api);

module.exports = app;