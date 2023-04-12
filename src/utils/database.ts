import mongoose from "mongoose"
import config from 'config'
import loggerC from "./logger"


async function doDBConnection() {
    const URI = config.get<string>('dbUri')
    
    try{
        await mongoose.connect(URI)
        loggerC.info("Connected to MongoDB database")
    }
    catch(err) {
        loggerC.error("Error connecting to MongoDB database")
        process.exit(1)
    }
}

export default doDBConnection