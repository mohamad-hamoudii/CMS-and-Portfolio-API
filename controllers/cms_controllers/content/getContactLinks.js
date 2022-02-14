const contactLinksModel = require('../../../models/contact-links.model');
const jwt = require('jsonwebtoken');

const getContactLinks = async (req, res) => {
    const token = req.headers['x-access-token'];
    const secret = process.env.JWT_SECRET_TOKEN;

    try {
        jwt.verify(token, secret);
        const contactLinks = await contactLinksModel.find();

        return res.json({ status: 'ok', contactLinks})
    }catch(error){
        return res.json({status: 'error', error: error})
    }
}

module.exports = getContactLinks;