"use strict";

const mongoose = require('mongoose');
const logger = require("../utils/logger");
require('dotenv/config');

module.exports = async function sessionManagementConfig(app) {
    const db = mongoose.connect(process.env.DB_CONNECTION_URL, {
        useNewUrlParser: true,
        useUnifiedTopology: true,
        useFindAndModify: false,
    },
    () => logger.info("Conncted to mongoDB."));
}
