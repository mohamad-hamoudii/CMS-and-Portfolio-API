const mongoose = require('mongoose');

const VideoFile = new mongoose.Schema(
    {
        video: { type: String, required: true, unique: true },
        url: { type: String, required: true, unique: true },
    }, {
        collection: 'video-file'
    }
)

const model = mongoose.model('video-file', VideoFile);

module.exports = model;