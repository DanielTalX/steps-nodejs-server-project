const express = require('express');
const bodyParser = require('body-parser');
const cookieParser = require('cookie-parser');
require('dotenv/config');

const serverSettings = require('./settings/ServerSettings');
const dbConfig = require('./config/dbConfig');
const routes = require('./config/apiConfig');
const logger = require("./utils/logger");

const app = express();
app.disable('x-powered-by');

// middleware
dbConfig(app);

// parse application/json
app.use(bodyParser.json({
    limit: cookieParser.bodyLimit
}));
app.use(cookieParser());

// api routes v1
app.use('/api/v1', routes);

app.listen(serverSettings.port, function () {
    logger.info(`App running on http://localhost:${serverSettings.port}`)
});
