const mongoose = require('mongoose');

const aboutCV = new mongoose.Schema(
    {
        cv: { type: String, required: true, unique: true },
        url: { type: String, required: true, unique: true },
    }, {
        collection: 'about-cv'
    }
)

const model = mongoose.model('about-cv', aboutCV);

module.exports = model;