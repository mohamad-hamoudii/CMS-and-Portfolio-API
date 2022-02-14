const galleriesModel = require('../../../models/galleries.model');
const jwt = require('jsonwebtoken');

const changeGalleriesOrder = async (req, res) => {
    const { currentGalleries, positionsInfo, token } = req.body;
    const secret = process.env.JWT_SECRET_TOKEN;

    try {
        jwt.verify(token, secret);

        await galleriesModel.deleteMany({})

        const updatedGalleries = changePositions(currentGalleries, positionsInfo);

        for (let i = 0; i < positionsInfo.length; i++) {
            await galleriesModel.create(updatedGalleries[i])
        }

        return res.json({ status: 'ok' });
    } catch (error) {
        console.log(error)
        return res.json({ status: 'error', error: error })
    }
}

const changePositions = (galleries, positionsInfo) => {
    const size = galleries.length;
    const updatedGalleries = [];

    for (let i = 0; i < size; i++){
        const name1 = galleries[i].galleryName;

        for (let j = 0; j < size; j++) {
            const name2 = galleries[j].galleryName;

            if (name1 === name2) {
                const gallery = {
                    galleryName: name2,
                    positionInPortfolio: positionsInfo[i].position,
                    gallery: galleries[i].gallery.map((image, i) => {
                        return {
                            positionInGallery: i + 1,
                            imageURL: image.imageURL
                        }
                    })
                }

                updatedGalleries.push(gallery);
            }
        }
    }
    
    return updatedGalleries;
}

module.exports = changeGalleriesOrder;