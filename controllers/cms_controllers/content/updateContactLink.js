const contactLinksModel = require('../../../models/contact-links.model');
const jwt = require('jsonwebtoken');

const updateContactLink = async (req, res) => {
    const {type, contact, url, token} = req.body;

    const secret = process.env.JWT_SECRET_TOKEN;

    const isValidContactData = checkValidContactData(type, contact, url);

    if (!isValidContactData) {
        return res.json({ status: 'type_error'})
    }

    try {
        jwt.verify(token, secret);

        if (url) {
            await contactLinksModel.updateOne({ type: type }, { $set: {contact: contact, URL: url} });
        } else {
            await contactLinksModel.updateOne({ type: type }, { $set: {contact: contact} });
        }
        const contactLinks = await contactLinksModel.find();

        return res.json({ status: 'ok', contactLinks })
    } catch (error) {
        return res.json({ status: 'error', error: error })
    }
}

module.exports = updateContactLink;

const checkValidContactData = (type, contact) => {
    switch(type){
        case "phone number":
            return isPhoneNumber(contact);
        case "email":
            return isEmail(contact);
        default:
            return true;
    }
}

const isPhoneNumber = (number) => {
    const invalidNumber = number.replace(/[0-9]|[+]/g, "").trim();

    //replace all digits and '+', if phoneNumber length is more than 0 then it's an invalid phone number
    return invalidNumber.length > 0 ? false : true;
}

const isEmail = (email) => {

    // Regular Expression (Not accepts second @ symbol
    // before the @gmail.com and accepts everything else)
    var regexp = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;

    // Converting the email to lowercase
    return regexp.test(String(email).toLowerCase());
}