const aboutImageModel = require('../../../models/about-image.model');
const jwt = require('jsonwebtoken');

const updateAboutImage = async (req, res) => {
    const { url, token } = req.body;

    const secret = process.env.JWT_SECRET_TOKEN;
    const imageName = "portfolio image";

    try {
        jwt.verify(token, secret);
        // await aboutImageModel.updateOne({ image: imageName }, { $set: { url: url } })
        await aboutImageModel.create({ image: imageName, url: url  })

        return res.json({ status: 'ok' });
    } catch (error) {
        return res.json({ status: 'error', error: error })
    }
}

module.exports = updateAboutImage;