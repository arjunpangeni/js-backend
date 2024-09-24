
const express = require('express')
const UrlRoute = require('./Routes/url')
const dbConnect = require('./db/dbConnect')
const URL = require('./models/url')
const app = express()

app.use(express.json())

app.use('/url', UrlRoute)



app.get('/:shortId', async (req, res) => {
    const shortId = req.params.shortId;  // Get the shortId from the URL

    try {
        // First, find the document by shortId
        const entry = await URL.findOne({ shortId });

        // If no document is found, return a 404 response
        if (!entry || !entry.redirectUrl) {
            return res.status(404).json({ error: "URL not found" });
        }

        // Update the visitHistory
        await URL.updateOne(
            { shortId },
            { $push: { visitHistory: { timestamp: Date.now() } } }
        );

        // If the document is found, redirect to the stored redirectUrl
        res.json('status done')
        console.log(URL.findById(shortId))
    } catch (error) {
        // Handle any errors
        res.status(500).json({ error: error.message });
    }
});




dbConnect()
    .then(() => {
        app.listen(8000, () => {
            console.log(`Server is running on port 8000`)
        })
    })
    .catch((error) => {
        console.log('error found at listening app :', error)
    })



