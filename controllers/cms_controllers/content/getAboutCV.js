const aboutCvModel = require('../../../models/about-cv.model');
const jwt = require('jsonwebtoken');

const getAboutCV = async (req, res) => {
    const token = req.headers['x-access-token'];
    const secret = process.env.JWT_SECRET_TOKEN;

    try {
        jwt.verify(token, secret);
        const cv = await aboutCvModel.findOne();
        
        return res.json({ status: 'ok', cvUrl: cv.url });
    } catch (error) {
        return res.json({ status: 'error', error: error })
    }
}

module.exports = getAboutCV;