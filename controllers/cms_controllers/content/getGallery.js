const galleriesModel = require('../../../models/galleries.model');
const jwt = require('jsonwebtoken');

const getGallery = async (req, res) => {
    const token = req.headers['x-access-token'];
    const { gallery } = req.params;
    const secret = process.env.JWT_SECRET_TOKEN;
    
    try {
        jwt.verify(token, secret);
        const galleryData = await galleriesModel.findOne({galleryName: gallery});

        return res.json({ status: 'ok', images: galleryData.gallery })
    } catch (error) {
        return res.json({ status: 'error', error: error })
    }
}

module.exports = getGallery;