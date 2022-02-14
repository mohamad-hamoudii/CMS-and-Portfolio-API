const mongoose = require('mongoose');

const AboutInfoText = new mongoose.Schema(
    {
        infoText: { type: String, required: true, unique: true },
        text: { type: String, required: true, unique: true },
    }, {
    collection: 'about-info-text'
}
)

const model = mongoose.model('about-info-text', AboutInfoText);

module.exports = model;