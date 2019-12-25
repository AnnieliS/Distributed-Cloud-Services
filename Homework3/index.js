const dotenv = require('dotenv').config();
const app = require('./app');
const http = require('http');
const port = process.env.PORT || 8080;

let server = http.createServer(app).listen(port);