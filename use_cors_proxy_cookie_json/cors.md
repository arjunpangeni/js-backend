

## What is Cors?
Cors is a security feature implemented by web browsers to control how pages or applications interact with resources from a different domain. without cors , our express app will not allow request from other domains.

if our frontend and backend are on different domains/ports , we will need to enable cors . if we are using `api` request from a browser, browser enforce `CORS` policies, so we will need to allow request from the frontend domain in our backend .

-   **Enable CORS in Express**: Add it as middleware in your Express app. Here's an example of how to enable CORS for all routes:
    
   ```` javascript

    
    const express = require('express');
    const cors = require('cors');
    
    const app = express();
    
    // Enable CORS for all routes
    app.use(cors());
    
    // Your routes
    app.get('/api/data', (req, res) => {
        res.json({ message: 'This is a CORS-enabled route' });
    });