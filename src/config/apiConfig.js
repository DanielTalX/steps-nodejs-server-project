const express = require('express');
const logger = require("../utils/logger");
const posts = require('../controller/posts');
const statistics = require('../controller/statistics');
const postsnumber = require('../controller/postsnumber');

let routes = express();

// api routes v1 (/api/v1)
routes.use('/posts', posts);
routes.use('/postsnumber', postsnumber);
routes.use('/statistics', statistics);
logger.info("Initialized routes succesfully.")

module.exports = routes;
