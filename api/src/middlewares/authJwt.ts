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

export const verifyTokenLogin = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const token = req.header('Authorization')

    if (!token)
      return res.status(403).json({
        mensaje: messageUtil.MENSAJE_NO_AUTENTIFICADO,
        status: messageUtil.STATUS_NOK,
        data: {}
      })

    var auth = Buffer.from(token.split(' ')[1], 'base64').toString().split(':')
    if (auth[0] != config.AUTH_USERNAME || auth[1] != config.AUTH_PASSWORD)
      return res.status(403).json({
        mensaje: messageUtil.MENSAJE_ERROR_USUARIO_PASSWORD,
        status: messageUtil.STATUS_NOK,
        data: {}
      })

    next()
  } catch (error) {
    return res.status(401).json({
      mensaje: messageUtil.MENSAJE_NO_AUTORIZADO,
      status: messageUtil.STATUS_NOK,
      data: {
        error: error
      }
    })
  }
}
