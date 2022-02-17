const videoFileModel = require('../../../models/video-file.model');
const jwt = require('jsonwebtoken');

const updateContactLink = async (req, res) => {
    const { url, token } = req.body;

    const secret = process.env.JWT_SECRET_TOKEN;
    const videoName = "portfolio video";

    try {
        jwt.verify(token, secret);
        // await videoFileModel.updateOne({ video: videoName }, { $set: { url: url } })

        await videoFileModel.create({ video: videoName, url: url  })

        return res.json({ status: 'ok'});
    } catch (error) {
        return res.json({ status: 'error', error: error })
    }
}

module.exports = updateContactLink;