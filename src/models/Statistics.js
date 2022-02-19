const mongoose = require('mongoose');

const statisticsSchema = mongoose.Schema({
    resource: { type: String, required: true },
    totalTime: { type: Number, required: true, default: 0 },
    totalRequests: { type: Number, required: true, default: 0 },
});

// add new statistics request runtime 
statisticsSchema.static("addNewStatistics", async function (resource, requestTime) {
    const query = { resource };
    const update = { $inc: { totalRequests: 1, totalTime: requestTime } };
    const options = { setDefaultsOnInsert: true, upsert: true };
    return await this.findOneAndUpdate(query, update, options).exec();
});


module.exports = mongoose.model('Statistics', statisticsSchema);