import { DataTypes } from 'sequelize'
import { sequelize } from '../database/database'
import { RoleModel } from './Role'

export const UserModel = sequelize.define(
  'iduser',
  {
    id_usuario: {
      type: DataTypes.UUID,
      defaultValue: DataTypes.UUIDV4,
      primaryKey: true,
      allowNull: false
    },
    username: {
      type: DataTypes.STRING(50),
      unique: true
    },
    password: {
      type: DataTypes.STRING
    },
    nombres: {
      type: DataTypes.STRING(100)
    },
    ap_paterno: {
      type: DataTypes.STRING(100)
    },
    ap_materno: {
      type: DataTypes.STRING(100)
    },
    descripcion: {
      type: DataTypes.STRING(255)
    },
    correo: {
      type: DataTypes.STRING(50)
    },
    id_rol: {
      type: DataTypes.UUID,
      references: {
        model: RoleModel, // Modelo destino (en este caso, el modelo 'RoleModel')
        key: 'id_rol' // Campo destino (en este caso, el campo 'id_rol' del modelo 'RolModel')
      }
    },
    estado: {
      type: DataTypes.BOOLEAN,
      defaultValue: true
    }
  },
  {
    freezeTableName: true,
    timestamps: true
  }
)
