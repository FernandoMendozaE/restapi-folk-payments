import { DataTypes } from 'sequelize'
import { sequelize } from '../database/database'

export const LogTransaccionModel = sequelize.define(
  'idlogtr',
  {
    id_log: {
      type: DataTypes.UUID,
      defaultValue: DataTypes.UUIDV4,
      primaryKey: true
    },
    id_usuario: {
      type: DataTypes.STRING(25)
    },
    nombre_metodo: {
      type: DataTypes.STRING(255)
    },
    method: {
      type: DataTypes.STRING(20)
    },
    endpoint: {
      type: DataTypes.STRING(100)
    },
    estado: {
      type: DataTypes.STRING(25)
    },
    cod_estado: {
      type: DataTypes.STRING(50)
    },
    request: {
      type: DataTypes.JSON
    },
    response: {
      type: DataTypes.JSON
    },
    nro_prestamo: {
      type: DataTypes.STRING
    },
    datos_adicionales: {
      type: DataTypes.JSON
    },
    time_response: {
      type: DataTypes.STRING
    }
  },
  {
    freezeTableName: true,
    timestamps: true
  }
)
