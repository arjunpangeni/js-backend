import mongoose from 'mongoose'
import { DB_Name } from '../constants.js'


const dbConnect = async () => {
    try {
        const connectionInstance = await mongoose.connect(`${process.env.MONGO_URI}/${DB_Name}`)
        console.log(`\n mongodb connected !! Db host: ${connectionInstance.connection.host}`)

    } catch (error) {
        console.log("mongodb connection error :", error)
        process.exit(1)
    }
    /*Calling process.exit() immediately ends the Node.js process. 
    It does not wait for any asynchronous operations to complete  */
}


export default dbConnect