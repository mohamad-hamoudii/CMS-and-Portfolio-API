const jwt = require('jsonwebtoken');
const aboutInfoTextModel = require('../../../models/about-info-text.model');

const getAboutInfoText = async (req, res) => {
    const token = req.headers['x-access-token'];
    const secret = process.env.JWT_SECRET_TOKEN;

    try {
        jwt.verify(token, secret);
        const infoText = await aboutInfoTextModel.findOne();

        return res.json({ status: 'ok', text: infoText.text });
    } catch (error) {
        return res.json({ status: 'error', error: error })
    }
}

module.exports = getAboutInfoText;