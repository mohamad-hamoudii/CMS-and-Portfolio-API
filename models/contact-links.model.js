const mongoose = require('mongoose');

const ContactLinks = new mongoose.Schema(
    {
        type: {type: String, required: true, unique: true},
        contact: { type: String, required: true },
        isURL: {type: Boolean, required: true},
        URL: {type: String}
    }, {
        collection: 'contact-links'
    }
)

const model = mongoose.model('contact-links', ContactLinks);

module.exports = model;