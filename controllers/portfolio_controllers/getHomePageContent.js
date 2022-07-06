const getAboutContent = require('./getAboutContent');
const getVideo = require('./getVideo');
const getGalleries = require('./getGalleries');
const getContactLinks = require('./getContactLinks');

const getHomePageContent = async (req, res) => {
    const RECEIVED_SECRET = req.headers['x-access-token'];
    const SERVER_SECRET = process.env.JWT_SECRET_TOKEN;

    if (RECEIVED_SECRET !== SERVER_SECRET){
        return res.json({ status: 'error', error: "Invalid secret key" })
    }

    const aboutContent = await getAboutContent();
    const video = await getVideo();
    const galleries = await getGalleries();
    const contactLinks = await getContactLinks();

    let content;

    if (aboutContent && galleries && video) {
        content = {
            about: aboutContent,
            video: video,
            galleries: galleries,
            contacts: contactLinks
        }
    }

    return res.json({ status: 'ok', content });
}

module.exports = getHomePageContent;