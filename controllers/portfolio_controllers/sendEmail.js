require('dotenv').config();
const { options, sendMail } = require('../cms_controllers/api/nodemailer');

const sendEmail = async (req, res) => {
    const RECEIVED_SECRET = req.headers['x-access-token'];
    const SERVER_SECRET = process.env.JWT_SECRET_TOKEN;

    if (RECEIVED_SECRET !== SERVER_SECRET) {
        return res.json({ status: 'error', error: "Invalid secret key" })
    }

    const {email, name, message} = req.body;
    const adminEmail = process.env.SERVER_EMAIL;
    const subject = `New Email Submitted From Your Portfolio By ${name}`

    const mailBody = `
        Email: ${email}\n
        Name: ${name}\n
        Message: ${message}
    `
    const emailContent = options(adminEmail, adminEmail, subject, mailBody)

    const mailerResponse = sendMail(emailContent)
    
    if (mailerResponse.status === 'ok') {
        return res.json({ status: 'ok' });
    } else if (mailerResponse.status === 'error')
        return res.json({ status: 'error', error: "Failed to send email: " + mailerResponse.error})
}

module.exports = sendEmail;