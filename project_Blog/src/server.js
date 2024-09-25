const express = require('express')
const app = express()
const path = require('path')

const userRoute = require('./routes/user.router')

app.set('view engine', 'ejs')
app.set('views', path.resolve('./views'));

app.use('/user', userRoute)

app.get('/', (req, res) => {
    res.render('home')
})
app.listen(8000, () => {
    console.log('server is running on port 8000')
})