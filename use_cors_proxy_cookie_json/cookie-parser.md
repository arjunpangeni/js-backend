





## Cookie-parser

**`cookie-parser`** is a middleware in Express.js used to parse cookies attached to the client request. It simplifies handling cookies by parsing them into a JavaScript object that can be easily accessed in your route handlers.

### Why use `cookie-parser`?

-   When clients send HTTP requests to your server, cookies are often included in the request headers (`Cookie` header). These cookies might contain session data, user preferences, or authentication tokens.
-   **`cookie-parser`** helps you easily read these cookies in your Express routes.
-   It supports both **signed** and **unsigned cookies**. Signed cookies are cookies with a cryptographic signature to prevent tampering.

### How to Install `cookie-parser`:




`npm install cookie-parser` 

### How to Use `cookie-parser`:

-  **Use `cookie-parser` in our Express app**:
    

     ````javascript
    const express = require('express');
    const cookieParser = require('cookie-parser');
    
    const app = express();
    
    // Use cookie-parser middleware
    app.use(cookieParser());
    
    app.get('/', (req, res) => {
        // Access cookies from the request object
        console.log(req.cookies);
        res.send('Cookies: ' + JSON.stringify(req.cookies));
    });
    
    const PORT = 3000;
    app.listen(PORT, () => {
        console.log(`Server running on port ${PORT}`);
    });
    ```` 
    
    -   Here, `req.cookies` will contain all the cookies sent by the client as a JavaScript object.
    -   Example: If a client sends a cookie `name=arjun`, `req.cookies` will look like `{ name: 'arjun' }`.
-  **Setting Cookies**: You can set cookies in your route handler using `res.cookie()`:
    
    ````javascript
    
    app.get('/set-cookie', (req, res) => {
        // Set a cookie named 'username' 
       // with value 'arjun'
        res.cookie('username', 'arjun',
         { maxAge: 900000, httpOnly: true });
        res.send('Cookie is set');
    });
    ````
    
    -   `maxAge`: The time in milliseconds until the cookie expires.
    -   `httpOnly`: This prevents the cookie from being accessed by JavaScript (more secure).
-  **Signed Cookies**: You can sign cookies with a secret to ensure that they haven’t been tampered with. To enable this feature, you need to pass a secret string to the `cookieParser()` function.
    
   ```` javascript
    app.use(cookieParser('mySecretKey'));
    
    app.get('/set-signed-cookie', (req, res) => {
        // Set a signed cookie
        res.cookie('sessionId', 'abc123', { signed: true });
        res.send('Signed cookie is set');
    });
    
    app.get('/get-signed-cookie', (req, res) => {
        // Access signed cookies
        console.log(req.signedCookies); // Signed cookies
        res.send('Signed Cookies: ' + JSON.stringify(req.signedCookies));
    });
    ````
   
  - Signed cookies are stored in `req.signedCookies` instead of `req.cookies`.
   -  This ensures that the cookie can’t be tampered with because Express will validate the signature before returning the value.
    

    
