import mongoose from 'mongoose'
import config from '../util/config'
;(async () => {
  try {
    const db = await mongoose.connect(
      `mongodb://${config.MONGO_USER}:${config.MONGO_PASSWORD}@${config.MONGO_HOST}/${config.MONGO_DATABASE}`
    )
    console.log('DB connected to:', db.connection.name)
  } catch (error) {
    console.log(error)
  }
})()
