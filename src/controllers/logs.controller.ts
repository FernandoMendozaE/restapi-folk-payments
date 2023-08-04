import { Request, Response } from 'express'
import Logs from '../model/mongoose/logs'
import messageUtil from '../util/message.util'

interface MiDocumento extends Document {
  timestamp?: Date
  level?: string
  message?: string
  meta?: {
    method?: string
    endpoint?: string
    status?: number
    recurso?: any
    request?: any
    responseBody?: any
  }
}

export const listaLog = async (req: Request, res: Response) => {
  try {
    const logsFound: MiDocumento[] = await Logs.find(req.body.findData)
    console.log(logsFound)
    if (logsFound.length > 0) {
      return res.status(200).json({
        mensaje: messageUtil.MENSAJE_CORRECTO,
        estado: messageUtil.STATUS_OK,
        data: logsFound
      })
    } else {
      return res.status(200).json({
        mensaje: messageUtil.MENSAJE_CORRECTO,
        estado: messageUtil.STATUS_OK,
        data: logsFound
      })
    }
  } catch (error) {
    if (error instanceof Error) {
      res.status(500).json({
        mensaje: error.message
      })
    }
  }
}
