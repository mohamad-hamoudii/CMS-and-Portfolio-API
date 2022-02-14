const galleriesModel = require('../../../models/galleries.model');
const jwt = require('jsonwebtoken');

const addImages = async (req, res) => {
    const { galleryName, imagesURLs, token } = req.body;
    const secret = process.env.JWT_SECRET_TOKEN;

    try {
        jwt.verify(token, secret);
        
        let gallery = await galleriesModel.findOne({galleryName})

        let gallerySize = gallery.gallery.length;
        let newImagesAmount = imagesURLs.length;
        let urlsIndex = 0;
        
        while (newImagesAmount > 0) {
            gallery.gallery.push({
                positionInGallery: ++gallerySize,
                imageURL: imagesURLs[urlsIndex++]
            })

            newImagesAmount--;
        }

        gallery.save();
        
        return res.json({ status: 'ok', images: gallery.gallery });
    } catch (error) {
        console.log(error)
        return res.json({ status: 'error', error: error })
    }
}

module.exports = addImages;