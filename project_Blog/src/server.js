const express = require('express')
const app = express()
const path = require('path')
const dbConnect = require('./db/connection')

const userRoute = require('./routes/user.router')

app.set('view engine', 'ejs')
app.set('views', path.resolve('./views'));
app.use(express.urlencoded({ extended: false }))

app.use('/user', userRoute)

app.get('/', (req, res) => {
    res.render('home')
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