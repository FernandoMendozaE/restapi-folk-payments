import { Request, Response } from 'express'
import { LogTransaccionModel } from '../model/Log'
import { typeResponse } from './transaccion.controller'

export const saveLog = async (req: Request, response: typeResponse) => {
  try {
    const { id_usuario, descripcion } = req.queryRecurso
    const { estado, data } = response
    const { originalUrl, method } = req
    const { entidad, cod_error, cod_servicio, monto_total, id_transaccion_empresa, id_reversion } = req.body

    let dataAdicional: any = {
      entidad: entidad,
      cod_servicio,
      cod_error: data.cod_error,
      descripcion: data.descripcion,
      codigo_busqueda: data.codigo_busqueda
    }
    if (estado === 'OK') {
      switch (cod_servicio) {
        case 'consulta-pago':
          dataAdicional = {
            ...dataAdicional,
            importe_adeudado_decimal: data.importe_adeudado_decimal,
            nombre_cliente: data.nombre_cliente
          }
          break

        case 'pago-credito':
          dataAdicional = {
            ...dataAdicional,
            monto_total,
            id_transaccion_empresa: data.id_transaccion_empresa,
            id_transaccion_entidad: data.id_transaccion_entidad
          }
          break

        case 'reversion-pago':
          dataAdicional = {
            ...dataAdicional,
            monto_total: monto_total,
            id_transaccion_empresa,
            id_reversion
          }
          break

        default:
          break
      }
    }

    const objLog = {
      id_usuario,
      nombre_metodo: descripcion,
      method,
      endpoint: originalUrl,
      estado,
      cod_estado: data.cod_error,
      request: req.body,
      response,
      nro_prestamo: req.body.codigo_busqueda,
      datos_adicionales: dataAdicional
    }
    await LogTransaccionModel.create(objLog)
  } catch (error) {
    console.error(error)
  }
}
