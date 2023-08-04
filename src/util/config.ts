import dotenv from 'dotenv'
dotenv.config()

export default {
  PORT: process.env.PORT || '3000',
  POSTGRES_DATABASE: process.env.POSTGRES_DATABASE || 'paymentsdb',
  POSTGRES_USER: process.env.POSTGRES_USER || 'root',
  POSTGRES_PASSWORD: process.env.POSTGRES_PASSWORD || 'root',
  POSTGRES_HOST: process.env.POSTGRES_HOST || 'localhost',
  POSTGRES_PORT: (process.env.POSTGRES_PORT as unknown as number) || 5434,
  INITIALIZATION_DATABASE: process.env.INITIALIZATION_DATABASE || 0,
  JWT_SECRET: process.env.JWT_SECRET || '1d3pr01fd',
  BCRYPT_SALT_ROUNDS: Number(process.env.BCRYPT_SALT_ROUNDS) || 10,
  AUTH_USERNAME: process.env.AUTH_USERNAME || 'wsIdepro',
  AUTH_PASSWORD: process.env.AUTH_PASSWORD || 'ws1d3pr0',
  JWT_TIME_EXPIRY: process.env.JWT_TIME_EXPIRY || '365d',
  AUTH_VERSION: process.env.AUTH_VERSION || '2.0.0',
  MONGO_DATABASE: process.env.MONGO_DATABASE || 'admin',
  MONGO_USER: process.env.MONGO_USER || 'admin',
  MONGO_PASSWORD: process.env.MONGO_PASSWORD || 'password',
  MONGO_HOST: process.env.MONGO_HOST || '10.0.1.155',
  ENPOINT_TRANSACCION: process.env.ENPOINT_TRANSACCION || 'http://localhost:8080/',
  ENPOINT_CARTERA: process.env.ENPOINT_CARTERA || 'http://localhost:8080/',
  ENPOINT_SEGUROS: process.env.ENPOINT_SEGUROS || 'http://localhost:8080/',
  ENPOINT_ONBOARDING: process.env.ENPOINT_ONBOARDING || 'http://localhost:5001',
  USER_ONBOARDING: process.env.USER_ONBOARDING || 'API',
  CLAVE_ONBOARDING: process.env.CLAVE_ONBOARDING || 'Admin@2023',
  ENPOINT_TRASPASO: process.env.ENPOINT_TRASPASO || 'http://localhost:4001',
  ENPOINT_SEGIP: process.env.ENPOINT_SEGIP || 'http://localhost:4002',
  ENPOINT_CMC: process.env.ENPOINT_CMC || 'http://localhost:4003',
  ENPOINT_OPEN_API: process.env.ENPOINT_OPEN_API || 'http://localhost:4004',
  ENPOINT_FIRMA_DIGITAL: process.env.ENPOINT_FIRMA_DIGITAL || 'http://localhost:4005',
  ENPOINT_DIGISHOT: process.env.ENPOINT_DIGISHOT || 'http://localhost:4006'
}
