const mongoose = require('mongoose')

mongoose.set('strictQuery', true)
const dbConnect = async () => {
    try {
        const connectionInstance = await mongoose.connect(`mongodb://127.0.0.1:27017/arjundburl_shortner`)
        console.log(`\n mongodb connected !! Db host: ${connectionInstance.connection.host}`)

    } catch (error) {
        console.log("mongodb connection error :", error)
        process.exit(1)
    }
    /*Calling process.exit() immediately ends the Node.js process. 
    It does not wait for any asynchronous operations to complete  */
}


module.exports = dbConnect
