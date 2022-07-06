const galleriesModel = require('../../models/galleries.model');

const getGallery = async (req, res) => {
    const RECEIVED_SECRET = req.headers['x-access-token'];
    const SERVER_SECRET = process.env.JWT_SECRET_TOKEN;
    const galleryName = req.query.gallery

    if (galleryName === undefined) {
        return res.json({ status: 'error', error })
    }
    if (RECEIVED_SECRET !== SERVER_SECRET) {
        return res.json({ status: 'error', error: "Invalid secret key" })
    }

    try {
        const gallery = await galleriesModel.findOne({ galleryName: galleryName })

        return res.json({ status: 'ok', gallery: gallery.gallery });
    } catch (error) {
        return res.json({ status: 'error', error })
    }
}

module.exports = getGallery;