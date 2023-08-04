import express from 'express'
import config from './util/config'
import morgan from 'morgan'
import cors from 'cors'
import authRoutes from './routes/auth.routes'
import roleRoutes from './routes/role.routes'
import userRoutes from './routes/user.routes'
import { logsRegister } from './middlewares/logs.middleware'

const app = express()

app.set('port', config.PORT)
app.use(morgan('dev'))
app.use(cors())
app.use(express.json())
app.use(express.urlencoded({ extended: false }))

app.use(logsRegister)
app.use('/api/auth', authRoutes)
app.use('/api/roles', roleRoutes)
app.use('/api/users', userRoutes)

export default app
