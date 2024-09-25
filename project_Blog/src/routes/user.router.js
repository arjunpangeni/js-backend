const express = require('express')
const router = express.Router()
const User = require('../models/userSchema')



router.get('/signin', (req, res) => {
    return res.render('signin')
})


router.get('/signup', (req, res) => {
    return res.render('signup')
})

router.post('/signin', async (req, res) => {
    try {
        const { email, password } = req.body;

        // Assuming `User.matchPassword` checks email and compares password
        const user = await User.matchPassword(email, password);

        if (!user) {
            // If user is not found or password is incorrect
            console.log('Incorrect email or password');
            return res.redirect('/?error=invalid_credentials'); // Redirect with error query
        }

        console.log("User logged in:", user);

        // Redirect to homepage or dashboard upon successful login
        res.redirect('/');
    } catch (error) {
        console.error("Error during signin:", error);

        // Redirect to the homepage with a generic error
        res.redirect('/?error=signin_error');
    }
});


router.post('/signup', async (req, res) => {
    try {
        const { fullName, email, password } = req.body;

        // Create a new user in the database
        await User.create({
            fullName,
            email,
            password
        });

        // Redirect to home page on successful signup
        res.redirect('/');
    } catch (error) {
        console.error('Error during signup:', error);

        // Handle the error (e.g., show an error message to the user)
        res.status(500).send('Internal Server Error');
    }
});


module.exports = router