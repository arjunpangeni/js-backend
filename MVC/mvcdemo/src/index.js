const express = require('express')
const app = express()
const userRouter = require('./routes/user')
const connnectMongoDb = require('./db/dbconncetion')
const logReqRes = require('./middlewares/index')

//db conncetion 
connnectMongoDb()


//middlewares
app.use(express.urlencoded({ extended: false }))

app.use(logReqRes('log.txt'))

//routes
app.use('/user', userRouter)


app.listen(8000, () => {
    console.log('app is running on port 8000')
})