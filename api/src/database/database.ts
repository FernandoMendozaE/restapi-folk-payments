import { Sequelize } from 'sequelize'
import config from '../util/config'

export const sequelize = new Sequelize(config.POSTGRES_DATABASE, config.POSTGRES_USER, config.POSTGRES_PASSWORD, {
  host: config.POSTGRES_HOST,
  port: config.POSTGRES_PORT,
  dialect: 'postgres'
})
;(async () => {
  try {
    await sequelize.authenticate()
    if (config.INITIALIZATION_DATABASE === '1') await sequelize.sync({ force: true })
    console.log('Connection has been established successfully.')
  } catch (error) {
    console.log(error)
  }
})()
