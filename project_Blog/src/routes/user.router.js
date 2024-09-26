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
        const token = await User.matchPasswordAndGenerateToken(email, password);

        if (!token) {
            // If user is not found or password is incorrect
            console.log('token is not generate');
        }
        // Redirect to homepage or dashboard upon successful login
        return res.cookie('token', token).redirect('/')
    } catch (error) {
        console.error("Error during signin:", error);

        // Redirect to the homepage with a generic error
        return res.render('signin', {
            error: 'Invalid email or password',
        })
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

router.get('/logout', (req, res) => {
    res.clearCookie('token').redirect('/')
})

module.exports = router