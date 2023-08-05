import { Request, Response } from 'express'
import { UserModel } from '../model/User'
import { GetOrDeleteUserParamsType, UpdateUserBodyType, UpdateUserParamsType } from '../schemas/user.Schema'
import messageUtil from '../util/message.util'
import bcrypt from 'bcrypt'
import config from '../util/config'
import { RoleModel } from '../model/Role'
import { GetOrDeleteRoleParamsType, UpdateRoleBodyType, UpdateRoleParamsType } from '../schemas/role.schema'

export const createRole = async (req: Request, res: Response) => {
  try {
    // throw new Error('database errr')

    const { nombre_rol } = req.body // Extrae el nombre del rol desde el cuerpo de la solicitud

    // Crea un nuevo rol utilizando el método 'create' de Sequelize
    const role = await RoleModel.create({
      nombre_rol: nombre_rol
    })

    if (role) {
      res.status(201).json({
        mensaje: messageUtil.MENSAJE_CORRECTO,
        estado: messageUtil.STATUS_OK,
        data: role
      })
    } else {
      res.status(404).json({
        mensaje: messageUtil.MENSAJE_SIN_REGISTRO,
        estado: messageUtil.STATUS_OK,
        data: {}
      })
    }
  } catch (error) {
    if (error instanceof Error) {
      const dataError = error as any
      console.log(dataError)
      res.status(500).json({
        mensaje: messageUtil.MENSAJE_ERROR,
        estado: messageUtil.STATUS_NOK,
        data: {
          error: dataError.errors?.[0] ?? dataError.message
        }
      })
    }
  }
}

export const getRoles = async (req: Request, res: Response) => {
  try {
    const roles = await RoleModel.findAll({ where: { estado: true } })
    if (roles) {
      res.status(200).json({
        mensaje: messageUtil.MENSAJE_CORRECTO,
        estado: messageUtil.STATUS_OK,
        data: roles
      })
    } else {
      res.status(404).json({
        mensaje: messageUtil.MENSAJE_SIN_REGISTRO,
        estado: messageUtil.STATUS_OK,
        data: {}
      })
    }
  } catch (error) {
    if (error instanceof Error) {
      const dataError = error as any
      console.log(dataError)
      res.status(500).json({
        mensaje: messageUtil.MENSAJE_ERROR,
        estado: messageUtil.STATUS_NOK,
        data: {
          error: dataError.errors?.[0] ?? dataError.message
        }
      })
    }
  }
}

export const getRole = async (req: Request<GetOrDeleteRoleParamsType, unknown, unknown, unknown>, res: Response) => {
  try {
    const { id } = req.params
    const role = await RoleModel.findOne({ where: { id_rol: id, estado: true } })
    if (role) {
      res.status(200).json({
        mensaje: messageUtil.MENSAJE_CORRECTO,
        estado: messageUtil.STATUS_OK,
        data: role
      })
    } else {
      res.status(404).json({
        mensaje: messageUtil.MENSAJE_SIN_REGISTRO,
        estado: messageUtil.STATUS_OK,
        data: {}
      })
    }
  } catch (error) {
    if (error instanceof Error) {
      const dataError = error as any
      console.log(dataError)
      res.status(500).json({
        mensaje: messageUtil.MENSAJE_ERROR,
        estado: messageUtil.STATUS_NOK,
        data: {
          error: dataError.errors?.[0] ?? dataError.message
        }
      })
    }
  }
}

export const updateRole = async (
  req: Request<UpdateRoleParamsType, unknown, UpdateRoleBodyType, unknown>,
  res: Response
) => {
  try {
    const { nombre_rol, estado } = req.body // Extrae el id_rol y el nuevo nombre del rol desde el cuerpo de la solicitud
    const { id } = req.params

    // Utiliza el método 'update' de Sequelize para actualizar el rol
    const updatedRoles = await RoleModel.update({ nombre_rol, estado }, { where: { id_rol: id } })

    if (updatedRoles[0] === 1) {
      const updateRole = await RoleModel.findOne({ where: { id_rol: id } })
      res.status(200).json({
        mensaje: messageUtil.MENSAJE_CORRECTO,
        status: messageUtil.STATUS_OK,
        data: updateRole
      })
    } else {
      res.status(404).json({
        mensaje: messageUtil.MENSAJE_SIN_REGISTRO,
        status: messageUtil.STATUS_NOK,
        data: {}
      })
    }
  } catch (error) {
    const dataError = error as any
    console.log(dataError)
    res.status(500).json({
      mensaje: messageUtil.MENSAJE_ERROR,
      estado: messageUtil.STATUS_NOK,
      data: {
        error: dataError.errors?.[0] ?? dataError.message
      }
    })
  }
}

export const deleteRole = async (
  req: Request<UpdateRoleParamsType, unknown, UpdateRoleBodyType, unknown>,
  res: Response
) => {
  try {
    const { id } = req.params

    // Utiliza el método 'destroy' de Sequelize para eliminar el rol
    const deletedRows = await RoleModel.destroy({ where: { id_rol: id } })

    if (deletedRows !== 0) {
      // Assuming you have a messageUtil object available with the required constants
      res.status(204).json({
        mensaje: messageUtil.MENSAJE_CORRECTO,
        status: messageUtil.STATUS_OK,
        data: {}
      })
    } else {
      res.status(404).json({
        mensaje: messageUtil.MENSAJE_SIN_REGISTRO,
        status: messageUtil.STATUS_NOK,
        data: {}
      })
    }
  } catch (error) {
    const dataError = error as any
    console.log(dataError)
    res.status(500).json({
      mensaje: messageUtil.MENSAJE_ERROR,
      estado: messageUtil.STATUS_NOK,
      data: {
        error: dataError.errors?.[0] ?? dataError.message
      }
    })
  }
}
