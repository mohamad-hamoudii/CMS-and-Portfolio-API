const express = require('express');
const router = express.Router();

const signInController = require('../../controllers/cms_controllers/auth/signIn');
router.post('/sign-in', signInController);

const forgotPasswordController = require('../../controllers/cms_controllers/auth/forgotPassword');
router.post('/forgot-password', forgotPasswordController);

const resetPasswordController = require('../../controllers/cms_controllers/auth/resetPassword');
router.post('/reset-password', resetPasswordController);

const changePasswordController = require('../../controllers/cms_controllers/auth/changePassword');
router.post('/change-password', changePasswordController);

const changeEmailController = require('../../controllers/cms_controllers/auth/changeEmail');
router.post('/change-email', changeEmailController);

module.exports = router;