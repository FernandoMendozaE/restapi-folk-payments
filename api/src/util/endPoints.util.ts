import config from './config'

export const pagoCreditoEndPoint = {
  ENDPOINT_CONSULTA_DEUDA: config.ENPOINT_TRANSACCION + 'cobro-credito/consulta',
  ENDPOINT_PAGO_DEUDA: config.ENPOINT_TRANSACCION + 'cobro-credito/pago',
  ENDPOINT_REVERSION_DEUDA: config.ENPOINT_TRANSACCION + 'cobro-credito/reversion'
}

export const carteraDigitalURL: any = {
  '/api/carteradigital/agencia': config.ENPOINT_CARTERA + 'cartera-digital',
  '/api/carteradigital/zona': config.ENPOINT_CARTERA + 'cartera-digital',
  '/api/carteradigital/gestor': config.ENPOINT_CARTERA + 'cartera-digital',
  '/api/carteradigital/perfil': config.ENPOINT_CARTERA + 'cartera-digital',
  '/api/carteradigital/credito': config.ENPOINT_CARTERA + 'cartera-digital',
  '/api/carteradigital/lineaCredito': config.ENPOINT_CARTERA + 'cartera-digital',
  '/api/carteradigital/creditoAsignado': config.ENPOINT_CARTERA + 'cartera-digital',
  '/api/carteradigital/historialPago': config.ENPOINT_CARTERA + 'cartera-digital',
  '/api/carteradigital/cliente': config.ENPOINT_CARTERA + 'cartera-digital',
  '/api/carteradigital/fiador': config.ENPOINT_CARTERA + 'cartera-digital',
  '/api/carteradigital/fiadorAsignado': config.ENPOINT_CARTERA + 'cartera-digital',
  '/api/carteradigital/garantia': config.ENPOINT_CARTERA + 'cartera-digital',
  '/api/carteradigital/garantiaAsignado': config.ENPOINT_CARTERA + 'cartera-digital'
}

export const segurosURL: any = {
  '/api/seguros/participantePrestamo': config.ENPOINT_SEGUROS + 'seguros',
  '/api/seguros/cliente': config.ENPOINT_SEGUROS + 'seguros',
  '/api/seguros/datosPrestamo': config.ENPOINT_SEGUROS + 'seguros',
  '/api/seguros/datosOperacion': config.ENPOINT_SEGUROS + 'seguros',
  '/api/seguros/datosOperacionPorNumeroDocumento': config.ENPOINT_SEGUROS + 'seguros',
  '/api/seguros/miVidaguroPorFechas': config.ENPOINT_SEGUROS + 'seguros',
  '/api/seguros/usuariosNB': config.ENPOINT_SEGUROS + 'seguros',
  '/api/seguros/ideproFamilia': config.ENPOINT_SEGUROS + 'seguros'
}
