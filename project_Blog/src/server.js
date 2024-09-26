const express = require('express')
const app = express()
const path = require('path')
const dbConnect = require('./db/connection')
const cookieParser = require('cookie-parser')

const userRoute = require('./routes/user.router')
const { checkForAuthTokenCookie } = require('./middlewares/userAuth')

app.set('view engine', 'ejs')
app.set('views', path.resolve('./views'));
app.use(express.urlencoded({ extended: false }))
app.use(cookieParser())
app.use('/user', userRoute)
app.use(checkForAuthTokenCookie('token'))

app.get('/', (req, res) => {
    res.render('home', {
        user: req.user
    })
})

dbConnect()
    .then(() => {
        app.listen(8000, () => {
            console.log(`Server is running on port 8000`)
        })
    })
    .catch((error) => {
        console.log('error found at listening app :', error)
    })