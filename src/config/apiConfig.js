const express = require('express');
const logger = require("../utils/logger");
const posts = require('../controller/posts');

let routes = express();

// api routes v1 (/api/v1)
routes.use('/posts', posts);
logger.info("Initialized routes succesfully.")

module.exports = routes;
