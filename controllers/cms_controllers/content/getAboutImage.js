const jwt = require('jsonwebtoken');
const aboutImageModel = require('../../../models/about-image.model');

const getAboutImage = async (req, res) => {
    const token = req.headers['x-access-token'];
    const secret = process.env.JWT_SECRET_TOKEN;

    try {
        jwt.verify(token, secret);
        const image = await aboutImageModel.findOne();

        return res.json({ status: 'ok', imageUrl: image.url });
    } catch (error) {
        return res.json({ status: 'error', error: error })
    }
}

module.exports = getAboutImage;