/**
 * ? Archivo encargado de verificar el token
 */
import jwt from 'jsonwebtoken'
import config from '../util/config'
import { NextFunction, Request, Response } from 'express'
import messageUtil from '../util/message.util'
interface JwtPayload {
  rolId: string
}

export const verifyToken = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const token = req.header('Authorization')
    if (!token)
      return res.status(403).json({
        mensaje: messageUtil.MENSAJE_NO_TOKEN,
        status: messageUtil.STATUS_NOK,
        data: {}
      })
    const decoded: any = jwt.verify(token.split(' ')[1], config.JWT_SECRET) as JwtPayload
    req.rolId = decoded.rol

    next()
  } catch (error) {
    const messageResponse = {
      mensaje: messageUtil.MENSAJE_NO_AUTORIZADO,
      status: messageUtil.STATUS_NOK,
      data: {
        error: error
      }
    }
    res.locals.data = messageResponse
    return res.status(401).json(messageResponse)
  }
}
