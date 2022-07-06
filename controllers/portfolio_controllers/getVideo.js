const videoFileModel = require('../../models/video-file.model');

const getVideo = async () => {
    try {
        const video = await videoFileModel.findOne();

        return video.url;
    } catch (error) {
        console.log("Failed to get video: " + error);
        return false;
    }
}

module.exports = getVideo;