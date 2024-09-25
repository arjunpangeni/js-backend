const express = require('express')
const router = express.Router()
const User = require('../models/userSchema')



router.get('./signin', (req, res) => {
    return res.render('signin')
})


router.get('/signup', (req, res) => {
    return res.render('signup')
})

router.post('./signup', async (req, res) => {

    const { fullName, email, password } = req.body
    await User.create({
        fullName, email, password
    })
    return res.redirect('/')
})











module.exports = router