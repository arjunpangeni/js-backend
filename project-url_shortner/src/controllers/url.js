const URL = require('../models/url');
const { nanoid } = require('nanoid');

async function handleGenerateNewShortUrl(req, res) {
    const body = req.body;

    if (!body.url) return res.status(400).json({ error: "url is required" });

    const shortId = nanoid(8); // Generate an 8-character unique ID

    try {
        await URL.create({
            shortId: shortId,
            redirectUrl: body.url,  // Ensure this matches your Mongoose schema
            visitHistory: []
        });

        return res.json({ id: shortId });
    } catch (error) {
        return res.status(500).json({ error: error.message });
    }
}

module.exports = { handleGenerateNewShortUrl };
