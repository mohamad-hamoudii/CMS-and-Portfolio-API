const contactLinksModel = require('../../models/contact-links.model');

const getContactLinks = async () => {
    try {
        const contactLinks = await contactLinksModel.find();

        return contactLinks
    } catch (error) {
        console.log("Failed to get contact links: " + error);
        return false;
    }
}

module.exports = getContactLinks;