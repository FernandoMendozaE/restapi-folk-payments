import { DataTypes } from 'sequelize'
import { sequelize } from '../database/database'

export const RoleModel = sequelize.define(
  'rol',
  {
    id_rol: {
      type: DataTypes.UUID, // Tipo de dato: UUID (Identificador Único Universal)
      defaultValue: DataTypes.UUIDV4, // Valor por defecto: Genera un UUID automáticamente al crear un nuevo registro
      primaryKey: true, // Es la clave primaria de la tabla
      allowNull: false // No se permite que sea nulo (debe tener un valor)
    },
    nombre_rol: {
      type: DataTypes.STRING(50), // Tipo de dato: Cadena de texto con longitud máxima de 50 caracteres
      unique: true
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
