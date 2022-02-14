require('dotenv').config();
const userModel = require('../../../models/user.model');
const jwt = require('jsonwebtoken');
const { options, sendMail } = require('../api/nodemailer');

const TOKEN_EXPIRY_TIME = "15m";

const forgotPassword = async (req, res) => {
    const {email} = req.body;

    const user = await userModel.findOne({ email: email });

    if (!user) {
        return res.json({ status: 'error', error: 'User not found' });
    }

    const id = user.id;

    // Link generated using this link is a one time use
    // because once the password is changed, the new password 
    // won't match the previous password in the secret token 
    // of the reset password
    const SECRET = process.env.JWT_SECRET_TOKEN + user.password;
    const payload = {email, id};
    const token = jwt.sign(payload, SECRET, { expiresIn: TOKEN_EXPIRY_TIME});

    const link = getLink(req, id, token);

    console.log(link);
    const response = sendResetLinkEmailToUser(email, link, TOKEN_EXPIRY_TIME);

    if(response.status !== "ok"){
        return res.json({status: 'error', error: response.error});
    }
    return res.json({status: 'ok'});
}

const sendResetLinkEmailToUser = (toEmail, link, EXPIRES_IN) => {
    const FROM_EMAIL = process.env.SERVER_EMAIL;
    const SUBJECT = "Mohamad Hamoudi CMS password reset link";
    const message = `
        Reset link: ${link}\n\n
        This link expires in ${EXPIRES_IN}
    `;
    
    const mailingOptions = options(FROM_EMAIL, toEmail, SUBJECT, message);

    return sendMail(mailingOptions);
}

const getLink = (req, id, token) => {
    const CMS_HOST = process.env.CMS_HOST;
    
    return `${req.protocol}://${CMS_HOST}/reset-password/${id}/${token}`;
}

module.exports = forgotPassword;