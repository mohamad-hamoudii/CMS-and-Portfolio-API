const aboutImageModel = require('../../../models/about-image.model');
const galleriesModel = require('../../../models/galleries.model');
const jwt = require('jsonwebtoken');

const dashboardContent = async (req, res) => {
    const token = req.headers['x-access-token'];
    const secret = process.env.JWT_SECRET_TOKEN;

    try {
        jwt.verify(token, secret);
        const galleries = await galleriesModel.find().sort({ positionInPortfolio: 1 });
        const image = await aboutImageModel.find();

        return res.json({ status: 'ok', galleries: galleries, aboutImage: image[0].url })
    } catch (error) {
        return res.json({ status: 'error', error: error })
    }
}

module.exports = dashboardContent;