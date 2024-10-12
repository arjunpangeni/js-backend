In Express.js, a Router is a mini application or instance of middleware and routes. It is used to handle requests for specific paths. It helps organize routes in your Express app by separating the routing logic into modular files.

example

1. Creating Routes with Router:



const express = require('express');
const app = express();
const router = express.Router();

// Define routes
router.get('/home', (req, res) => {
  res.send('Welcome to Home Page!');
});

router.get('/about', (req, res) => {
  res.send('About Us Page');
});

// Use the router in the main app
app.use('/', router);

app.listen(3000, () => {
  console.log('Server is running on port 3000');
});

Benefits of Using Router:

1. Modularity: Break your routes into smaller, more manageable files.


2. Middleware Specificity: You can attach middleware to specific routes.


3. Improved Code Organization: Especially useful for larger applications.



Example with Modular Router:

You can separate routes into different files for better organization.

routes/home.js:

const express = require('express');
const router = express.Router();

router.get('/', (req, res) => {
  res.send('Home Page');
});

module.exports = router;

app.js:

const express = require('express');
const app = express();
const homeRoutes = require('./routes/home');

app.use('/home', homeRoutes);

app.listen(3000, () => {
  console.log('Server running on port 3000');
});

This keeps your code clean and easy to maintain.

