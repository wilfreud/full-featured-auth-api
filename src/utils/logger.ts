import pino from 'pino'
// import dayjs from 'dayjs'
import config from 'config'

const level = config.get<string>('logLevel')

const loggerC = pino({
    transport : {
        target : "pino-pretty"
    },
    base : {
        pid : false
    },
    level,
    timestamp :  pino.stdTimeFunctions.isoTime
    // timestamp : () => `, "time":"${dayjs().format()}"`
})

export default loggerC