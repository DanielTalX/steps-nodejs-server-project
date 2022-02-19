const Statistics = require('../models/Statistics');
const logger = require("../utils/logger");

const getDurationInMilliseconds = (start) => {
    const NS_PER_SEC = 1e9
    const NS_TO_MS = 1e6
    const diff = process.hrtime(start)
    return (diff[0] * NS_PER_SEC + diff[1]) / NS_TO_MS
}

exports.calcReqeustRuntime = function (resource) {
    return async (req, res, next) => {
        try {
            logger.info(`${req.method} ${req.originalUrl} [STARTED]`);
            const start = process.hrtime();

            /*res.on('finish', async () => {
                const durationInMilliseconds = getDurationInMilliseconds(start);
                await Statistics.addNewStatistics(resource, durationInMilliseconds);
                logger.info(`${req.method} ${req.originalUrl} [FINISHED] ${durationInMilliseconds.toLocaleString()} ms`);
            });*/

            res.on('close', async () => {
                const durationInMilliseconds = getDurationInMilliseconds(start);
                await Statistics.addNewStatistics(resource, durationInMilliseconds);
                logger.info(`${req.method} ${req.originalUrl} [CLOSED] ${durationInMilliseconds.toLocaleString()} ms`);
            });

            next();
        } catch (error) {
            logger.error(`Error on ${req.method} ${req.originalUrl} calcReqeustRuntime error = `, error);
            //next(error);
            next();
        }
    }
};
