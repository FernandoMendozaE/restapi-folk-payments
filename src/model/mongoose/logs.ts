import { Schema, model } from 'mongoose'

const logsSchema = new Schema({
  timestamp: Date,
  level: String,
  message: String,
  meta: {
    method: String,
    endpoint: String,
    status: Number,
    recurso: Object,
    request: Object,
    responseBody: Object
  }
})

export default model('Logs', logsSchema)
