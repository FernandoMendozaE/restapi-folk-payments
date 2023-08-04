import { Request, Response, NextFunction } from 'express'
import { createLogger, format } from 'winston'
import { MongoDB } from 'winston-mongodb'
import config from '../util/config'

export const logsRegister = async (req: Request, res: Response, next: NextFunction) => {
  try {
    res.on('finish', () => {
      const logEntry = {
        method: req.method,
        endpoint: req.originalUrl,
        status: res.statusCode,
        recurso: req.queryRecurso,
        request: req.body,
        responseBody: res.locals.data
      }
      // console.log(res.locals)
      if (res.statusCode === 200) {
        logger.info('OK', { meta: logEntry })
      } else {
        logger.error('NOK', { meta: logEntry })
      }
    })
    next()
  } catch (error) {
    return res.status(500).json({ message: 'Internal server error in logs' })
  }
}

const logger = createLogger({
  level: 'info',
  format: format.combine(format.timestamp(), format.json()),
  transports: [
    // new transports.Console(),
    new MongoDB({
      level: 'info',
      db: `mongodb://${config.MONGO_USER}:${config.MONGO_PASSWORD}@${config.MONGO_HOST}/${config.MONGO_DATABASE}`,
      options: {
        useNewUrlParser: true,
        useUnifiedTopology: true
      },
      collection: 'logs',
      metaKey: 'meta'
    })
  ]
})
