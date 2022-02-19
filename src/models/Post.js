const mongoose = require('mongoose');

const PostSchema = mongoose.Schema({
    username: {type: String, required: true, min: 8, max: 80},
    title: {type: String, required: true, min: 2, max: 30},
    body: {type: String, required: true, min: 2, max: 2000},
    subject: {type: String, required: true, min: 2, max: 50},
    insertionTime: {type: Date, default: Date.now }
});

module.exports = mongoose.model('Post', PostSchema);
