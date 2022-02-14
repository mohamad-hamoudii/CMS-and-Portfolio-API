const express = require('express');
const router = express.Router();

const dashboardContentController = require('../../controllers/cms_controllers/content/dashboardContent');
router.get('/dashboard', dashboardContentController);

const getContactLinksController = require('../../controllers/cms_controllers/content/getContactLinks');
const updateContactLinkController = require('../../controllers/cms_controllers/content/updateContactLink');
router.get('/contact-links', getContactLinksController);
router.post('/contact-links', updateContactLinkController);

const getVideoFileController = require('../../controllers/cms_controllers/content/getVideoFile');
const updateVideoFileController = require('../../controllers/cms_controllers/content/updateVideoFile');
router.get('/video-file', getVideoFileController);
router.post('/video-file', updateVideoFileController);

const getAboutCVController = require('../../controllers/cms_controllers/content/getAboutCV');
const updateAboutCVController = require('../../controllers/cms_controllers/content/updateAboutCV');
router.get('/about/cv', getAboutCVController);
router.post('/about/cv', updateAboutCVController);

const getAboutImageController = require('../../controllers/cms_controllers/content/getAboutImage');
const updateAboutImageController = require('../../controllers/cms_controllers/content/updateAboutImage');
router.get('/about/image', getAboutImageController);
router.post('/about/image', updateAboutImageController);

const getAboutInfoTextController = require('../../controllers/cms_controllers/content/getAboutInfoText');
const updateAboutInfoTextController = require('../../controllers/cms_controllers/content/updateAboutInfoText');
router.get('/about/info-text', getAboutInfoTextController);
router.post('/about/info-text', updateAboutInfoTextController);

const getGalleriesController = require('../../controllers/cms_controllers/content/getGalleries');
router.get('/galleries', getGalleriesController);

const addGalleryController = require('../../controllers/cms_controllers/content/addGallery');
router.post('/galleries/add-gallery', addGalleryController);

const changeGalleriesOrderController = require('../../controllers/cms_controllers/content/changeGalleriesOrder');
router.post('/galleries/galleries-order', changeGalleriesOrderController);

const deleteGalleryController = require('../../controllers/cms_controllers/content/deleteGallery');
router.post('/galleries/delete-gallery', deleteGalleryController);

const deleteImageController = require('../../controllers/cms_controllers/content/deleteImage');
router.post('/galleries/gallery/delete-image', deleteImageController);

const addImagesController = require('../../controllers/cms_controllers/content/addImages');
router.post('/galleries/gallery/add-images', addImagesController);

const updateGalleryNameController = require('../../controllers/cms_controllers/content/updateGalleryName');
router.post('/galleries/gallery/gallery-name', updateGalleryNameController);

const getGalleryController = require('../../controllers/cms_controllers/content/getGallery');
router.get('/galleries/gallery/:gallery', getGalleryController);


module.exports = router;