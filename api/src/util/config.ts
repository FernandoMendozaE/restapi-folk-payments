import dotenv from 'dotenv'
dotenv.config()

export default {
  PORT: process.env.PORT || '6001',
  POSTGRES_DATABASE: process.env.POSTGRES_DATABASE || 'paymentsdb',
  POSTGRES_USER: process.env.POSTGRES_USER || 'root',
  POSTGRES_PASSWORD: process.env.POSTGRES_PASSWORD || 'root',
  POSTGRES_HOST: process.env.POSTGRES_HOST || 'localhost',
  POSTGRES_PORT: (process.env.POSTGRES_PORT as unknown as number) || 5432,
  INITIALIZATION_DATABASE: process.env.INITIALIZATION_DATABASE || 0,
  JWT_SECRET: process.env.JWT_SECRET || '1d3pr01fd',
  BCRYPT_SALT_ROUNDS: Number(process.env.BCRYPT_SALT_ROUNDS) || 10,
  JWT_TIME_EXPIRY: process.env.JWT_TIME_EXPIRY || '365d',
  AUTH_VERSION: process.env.AUTH_VERSION || '2.0.0',

  HOST: process.env.HOST || `http://localhost:${process.env.PORT || '6000'}`,
  MERCADOPAGO_API_KEY:
    process.env.MERCADOPAGO_API_KEY || 'TEST-318875568195697-072609-aafed7aad86513f95f5a573d0be6e4c3-1433832360'
}
