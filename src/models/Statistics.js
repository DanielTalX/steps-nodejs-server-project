const mongoose = require('mongoose');

const statisticsSchema = mongoose.Schema({
    resource: { type: String, required: true },
    totalTime: { type: Number, required: true, default: 0 },
    totalRequests: { type: Number, required: true, default: 0 },
});

module.exports = mongoose.model('Statistics', statisticsSchema);