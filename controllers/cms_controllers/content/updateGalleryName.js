const galleriesModel = require('../../../models/galleries.model');
const jwt = require('jsonwebtoken');

const updateGalleryName = async (req, res) => {
    const { galleryName, newName, token } = req.body;

    const secret = process.env.JWT_SECRET_TOKEN;

    try {
        jwt.verify(token, secret);

        await galleriesModel.updateOne({galleryName: galleryName}, {$set: {galleryName: newName}});

        const newGalleries = await galleriesModel.find().sort({ positionInPortfolio: 1 });

        return res.json({ status: 'ok', galleries: newGalleries })
    } catch (error) {
        return res.json({ status: 'error', error: error })
    }
}

module.exports = updateGalleryName;