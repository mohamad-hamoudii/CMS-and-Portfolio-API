const galleriesModel = require('../../../models/galleries.model');
const jwt = require('jsonwebtoken');

const deleteImage = async (req, res) => {
    const { galleryName, url, token } = req.body;

    const secret = process.env.JWT_SECRET_TOKEN;

    try {
        jwt.verify(token, secret);

        // remove image from gallery images array
        await galleriesModel.updateOne({ galleryName }, { $pull: { gallery: { imageURL: url } } })

        const gallery = await galleriesModel.findOne({ galleryName });
        const images = gallery.gallery;

        // if removed image was the only image in gallery, delete gallery then re-sort galleries
        if (images.length === 0) {
            await galleriesModel.deleteOne({ galleryName });

            const deletedGalleryPosition = gallery.positionInPortfolio;
            const galleriesAfterDelete = await galleriesModel.find();

            const sortedGalleries = await sortGalleriesAfterGalleryDelete(galleriesAfterDelete, (deletedGalleryPosition - 1));
            
            if (sortedGalleries) {
                const newGalleries = await galleriesModel.find().sort({ positionInPortfolio: 1 });
                return res.json({ status: 'ok', galleries: newGalleries, images: [] });
            } else {
                return res.json({ status: 'error', error: "Error sorting galleries after gallery delete" });
            }
        }

        const newGalleries = await galleriesModel.find().sort({ positionInPortfolio: 1 });

        return res.json({ status: 'ok', galleries: newGalleries, images: gallery.gallery });
    } catch (error) {
        return res.json({ status: 'error', error: error })
    }
}

const sortGalleriesAfterGalleryDelete = (galleries, deletedIndex) => {
    let newGalleries = [...galleries];

    for (let i = deletedIndex; i < newGalleries.length; i++){
        const position = newGalleries[i].positionInPortfolio - 1;
        newGalleries[i].positionInPortfolio = position
    }
    
    return updateGalleriesPositionAfterSort(newGalleries, deletedIndex);
}

const updateGalleriesPositionAfterSort = async (galleries, deletedIndex) => {
    try {
        for (let i = deletedIndex; i < galleries.length; i++) {
            await galleriesModel.updateOne({ galleryName: galleries[i].galleryName }, { $set: { positionInPortfolio: galleries[i].positionInPortfolio}})
        }

        return true;
    }catch(error){
        console.log(error)
        return false;
    }
}

module.exports = deleteImage;