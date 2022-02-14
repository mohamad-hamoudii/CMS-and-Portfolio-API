const mongoose = require('mongoose');

const aboutImage = new mongoose.Schema(
    {
        image: { type: String, required: true, unique: true },
        url: { type: String, required: true, unique: true },
    }, {
    collection: 'about-image'
}
)

const model = mongoose.model('about-image', aboutImage);

module.exports = model;