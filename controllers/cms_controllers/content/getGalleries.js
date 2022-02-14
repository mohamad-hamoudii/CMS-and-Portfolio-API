const galleriesModel = require('../../../models/galleries.model');
const jwt = require('jsonwebtoken');

const getGalleries = async (req, res) => {
    const token = req.headers['x-access-token'];
    const secret = process.env.JWT_SECRET_TOKEN;

    try {
        jwt.verify(token, secret);
        const galleries = await galleriesModel.find().sort({positionInPortfolio: 1});

        return res.json({ status: 'ok', galleries })
    } catch (error) {
        return res.json({ status: 'error', error: error })
    }
}

module.exports = getGalleries;