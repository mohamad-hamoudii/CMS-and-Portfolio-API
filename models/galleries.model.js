const mongoose = require('mongoose');

const Gallery = new mongoose.Schema(
    {
        positionInGallery: { type: Number, required: true },
        imageURL: { type: String, required: true, unique: true },
    }, {
    collection: 'gallery'
}
)
const Galleries = new mongoose.Schema(
    {
        galleryName: { type: String, required: true, unique: true },
        positionInPortfolio: { type: Number, required: true, unique: true },
        gallery: [Gallery]
    }, {
    collection: 'galleries'
}
)

const model = mongoose.model('galleries', Galleries);

module.exports = model;