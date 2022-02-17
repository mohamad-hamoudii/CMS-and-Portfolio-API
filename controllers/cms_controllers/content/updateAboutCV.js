const aboutCvModel = require('../../../models/about-cv.model');
const jwt = require('jsonwebtoken');

const updateAboutCV = async (req, res) => {
    const { url, token } = req.body;

    const secret = process.env.JWT_SECRET_TOKEN;
    const cvName = "portfolio cv";

    try {
        jwt.verify(token, secret);
        await aboutCvModel.updateOne({ cv: cvName }, { $set: { url: url } })

        return res.json({ status: 'ok' });
    } catch (error) {
        return res.json({ status: 'error', error: error })
    }
}

module.exports = updateAboutCV;