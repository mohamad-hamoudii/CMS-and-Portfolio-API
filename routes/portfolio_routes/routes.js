const express = require('express');
const router = express.Router();

const getHomePageContent = require('../../controllers/portfolio_controllers/getHomePageContent');
router.get('/home-page-content', getHomePageContent);

const sendEmail = require('../../controllers/portfolio_controllers/sendEmail');
router.post('/send-email', sendEmail);

const getGallery = require('../../controllers/portfolio_controllers/getGallery');
router.get('/get-gallery', getGallery);

module.exports = router;