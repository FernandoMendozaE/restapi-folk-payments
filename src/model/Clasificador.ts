import { DataTypes } from 'sequelize'
import { sequelize } from '../database/database'

export const Clasificador = sequelize.define(
  'idclasificador',
  {
    id_prefijo: {
      type: DataTypes.INTEGER
    },
    id_correlativo: {
      type: DataTypes.INTEGER
    },
    descripcion: {
      type: DataTypes.STRING(255)
    },
    ruta_prefijo: {
      type: DataTypes.STRING(200)
    },
    add_user: {
      type: DataTypes.STRING(25)
    },
    estado: {
      type: DataTypes.BOOLEAN
    }
  },
  {
    freezeTableName: true,
    timestamps: true
  }
)

Clasificador.removeAttribute('id')
