const aboutCvModel = require('../../models/about-cv.model');
const aboutImageModel = require('../../models/about-image.model');
const aboutInfoTextModel = require('../../models/about-info-text.model');

const getAboutContent = async () => {
    try {
        const image = await aboutImageModel.findOne();
        const infoText = await aboutInfoTextModel.findOne();
        const cv = await aboutCvModel.findOne();
        
        const aboutContent = {
            image: image.url,
            cv: cv.url,
            info: infoText.text
        }
        
        return aboutContent;
    }catch(error){
        console.log("Failed to get about content: " + error);
        return false;
    }
}

module.exports = getAboutContent;