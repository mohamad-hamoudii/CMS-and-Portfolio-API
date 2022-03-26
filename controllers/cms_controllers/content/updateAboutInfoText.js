const aboutInfoTextModel = require('../../../models/about-info-text.model');
const jwt = require('jsonwebtoken');

const updateAboutInfoText = async (req, res) => {
    const { text, token } = req.body;

    const secret = process.env.JWT_SECRET_TOKEN;
    const infoName = "portfolio about me information";

    try {
        jwt.verify(token, secret);
        await aboutInfoTextModel.create({ infoText: infoName , text: text })
        // await aboutInfoTextModel.updateOne({ infoText: infoName }, { $set: { text: text } })

        return res.json({ status: 'ok' });
    } catch (error) {
        return res.json({ status: 'error', error: error })
    }
}

module.exports = updateAboutInfoText;