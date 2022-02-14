const galleriesModel = require('../../../models/galleries.model');
const jwt = require('jsonwebtoken');

const addGallery = async (req, res) => {
    const { galleryName, imagesURLs, token } = req.body;
    const secret = process.env.JWT_SECRET_TOKEN;

    try {
        jwt.verify(token, secret);

        const indexedImages = getIndexedImages(imagesURLs);

        const galleries = await galleriesModel.find();

        const newGallery = gallery(galleryName, (galleries.length + 1), indexedImages);

        await galleriesModel.create(newGallery);

        const newGalleries = await galleriesModel.find().sort({ positionInPortfolio: 1 });
        
        return res.json({ status: 'ok', galleries: newGalleries });
    } catch (error) {
        if (error.code === 11000) {
            return res.json({ status: 'error', error: "Gallery name already exists, please use a different gallery name." });
        }
        console.log(error)
        return res.json({ status: 'error', error: error })
    }
}

const getIndexedImages = (images) => {
    const size = images.length;
    const indexedImages = [];
    for(let i=0;i<size;i++){
        let image = {
            positionInGallery: i,
            imageURL: images[i]
        }
        indexedImages.push(image);
    }
    return indexedImages;
}

const gallery = (name, index, gallery) => {
    return {
        galleryName: name,
        positionInPortfolio: index,
        gallery: gallery
    }
}

module.exports = addGallery;