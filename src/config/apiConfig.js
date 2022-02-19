const express = require('express');
const logger = require("../utils/logger");

let routes = express();

// api routes v1 (/api/v1)
logger.info("Initialized routes succesfully.")

module.exports = routes;
