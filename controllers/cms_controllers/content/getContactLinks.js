const contactLinksModel = require('../../../models/contact-links.model');
const jwt = require('jsonwebtoken');

const getContactLinks = async (req, res) => {
    const token = req.headers['x-access-token'];
    const secret = process.env.JWT_SECRET_TOKEN;

    try {
        jwt.verify(token, secret);
        if (!addContactLinks()) {
            return res.json({ status: 'error', error: "Failed to create contacts" })
        }

        const contactLinks = await contactLinksModel.find();
        
        return res.json({ status: 'ok', contactLinks})
    }catch(error){
        return res.json({status: 'error', error: error})
    }
}

const contacts = [
    {
        type: 'phone number',
        contact: '+961 71 297 395',
        isURL: false
    },{
        type: 'email',
        contact: 'mohamadhamoudiphotography@gmail.com',
        isURL: false
    },{
        type: 'Instagram',
        contact: 'mohamadhamoudiphotography',
        isURL: true,
        URL: 'https://www.instagram.com/mohamadhamoudiphotography/'
    },{
        type: 'LinkedIn',
        contact: 'mohamadhamoudiphotography',
        isURL: true,
        URL: 'https://www.instagram.com/mohamadhamoudiphotography/'
    }
]
const addContactLinks = async () => {
    try {
        contacts.map(contact => {
            await contactLinksModel.create(contact)
        })

        return true;
    }catch(error){
        console.log(error);
        return false;
    }
}

module.exports = getContactLinks;