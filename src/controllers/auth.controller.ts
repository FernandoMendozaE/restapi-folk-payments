import { Request, Response } from 'express'
import jwt from 'jsonwebtoken'
import bcrypt from 'bcrypt'
import config from '../util/config'
import messageUtil from '../util/message.util'
import { UserModel } from '../model/User'
import { SingInBodySchema, SingUpBodySchema } from '../schemas/auth.schema'

export const signUp = async (req: Request<unknown, unknown, SingUpBodySchema, unknown>, res: Response) => {
  try {
    let messageResponse = {}
    const { password, username, id_rol } = req.body
    const userFound = (await UserModel.findOne({ where: { username } })) as any

    if (userFound) {
      messageResponse = {
        mensaje: messageUtil.MENSAJE_ERROR_DUPLICIDAD,
        status: messageUtil.STATUS_NOK,
        data: {}
      }
      res.locals.data = messageResponse
      return res.status(401).json(messageResponse)
    }

    const passwordHash = await bcrypt.hash(password, config.BCRYPT_SALT_ROUNDS)
    const data = passwordHash ? { ...req.body, password: passwordHash } : req.body
    await UserModel.create(data)

    const payload = {
      username: username,
      rol: id_rol,
      date: new Date()
    }
    const token = jwt.sign(payload, config.JWT_SECRET, {
      expiresIn: config.JWT_TIME_EXPIRY
    })

    messageResponse = {
      mensaje: messageUtil.MENSAJE_CORRECTO,
      status: messageUtil.STATUS_OK,
      data: {
        access_token: token,
        fecha: new Date().toLocaleString('en-US'),
        tiempo_expiracion: config.JWT_TIME_EXPIRY,
        version: config.AUTH_VERSION
      }
    }
    res.locals.data = messageResponse
    return res.status(200).json(messageResponse)
  } catch (error) {
    if (error instanceof Error) {
      res.status(500).json({
        mensaje: messageUtil.MENSAJE_ERROR,
        estado: messageUtil.STATUS_NOK,
        data: {
          error: error.message
        }
      })
    }
  }
}

export const signIn = async (req: Request<unknown, unknown, SingInBodySchema, unknown>, res: Response) => {
  try {
    const { username, password } = req.body
    const userFound = (await UserModel.findOne({ where: { username } })) as any
    let messageResponse = {}
    if (!userFound) {
      messageResponse = {
        mensaje: messageUtil.MENSAJE_ERROR_USUARIO,
        status: messageUtil.STATUS_NOK,
        data: {}
      }
      res.locals.data = messageResponse
      return res.status(401).json(messageResponse)
    }

    const matchPassword = await bcrypt.compare(password, userFound.password)

    if (!matchPassword) {
      messageResponse = {
        mensaje: messageUtil.MENSAJE_ERROR_USUARIO_PASSWORD,
        status: messageUtil.STATUS_NOK,
        data: {}
      }
      res.locals.data = messageResponse
      return res.status(401).json(messageResponse)
    }

    const payload = {
      username: username,
      rol: userFound.id_rol,
      date: new Date()
    }

    const token = jwt.sign(payload, config.JWT_SECRET, {
      expiresIn: config.JWT_TIME_EXPIRY
    })

    messageResponse = {
      mensaje: messageUtil.MENSAJE_CORRECTO,
      status: messageUtil.STATUS_OK,
      data: {
        access_token: token,
        fecha: new Date().toLocaleString('en-US'),
        tiempo_expiracion: config.JWT_TIME_EXPIRY,
        version: config.AUTH_VERSION
      }
    }
    res.locals.data = messageResponse
    return res.status(200).json(messageResponse)
  } catch (error) {
    if (error instanceof Error) {
      const messageError = {
        mensaje: messageUtil.MENSAJE_ERROR,
        estado: messageUtil.STATUS_NOK,
        data: {
          error: error.message
        }
      }
      res.locals.data = messageError
      res.status(500).json(messageError)
    }
  }
}
