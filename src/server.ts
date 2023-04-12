require('dotenv').config()
import express from 'express'
import config from 'config'
import doDBConnection from './utils/database'
import loggerC from './utils/logger'
import router from './routes'

// Constants
const PORT = config.get('port')

// Instaciation
const app = express()

// Routing
app.use('/api', router)

// Serving....
app.listen(PORT, () => {
    loggerC.info(`Server listening on port: ${PORT}`)
    doDBConnection()
})