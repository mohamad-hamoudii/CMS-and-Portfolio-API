const galleriesModel = require('../../models/galleries.model');

const getGalleries = async () => {
    try {
        const galleries = await galleriesModel.find().sort({ positionInPortfolio: 1 });

        return galleries;
    } catch (error) {
        console.log("Failed to get galleries: " + error);
        return false;
    }
}

module.exports = getGalleries;