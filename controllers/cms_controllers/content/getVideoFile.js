const videoFileModel = require('../../../models/video-file.model');
const jwt = require('jsonwebtoken');

const getVideoFile = async (req, res) => {
    const token = req.headers['x-access-token'];
    const secret = process.env.JWT_SECRET_TOKEN;

    try {
        jwt.verify(token, secret);
        const video = await videoFileModel.find();

        return res.json({ status: 'ok', videoUrl: video[0].url });
    } catch (error) {
        return res.json({ status: 'error', error: error })
    }
}

module.exports = getVideoFile;