import express from 'express'
import mongoose from 'mongoose'
import passport from 'passport'
import swagger from 'swagger-ui-express'
import swaggerConfig from './swagger.json'
import morgan from 'morgan'
import helmet from 'helmet'
import cors from 'cors'
import path from 'path'
import { MONGO_URI, PORT } from './config'
import strategy from './middlewares/passport'
import router from './routes'

declare global {
  namespace Express {
    interface User {
      id: number
      email: string
      password: string
    }
  }
}

const app = express()

app.use(morgan('dev'))
app.use(helmet())
app.use(cors())

app.use('/public/images', express.static(path.join('uploads', 'images')))
app.use('/api', swagger.serve, swagger.setup(swaggerConfig))

app.use(express.urlencoded({ extended: true }))
app.use(express.json())

app.use(passport.initialize())
passport.use(strategy)

app.use('/api', router)

mongoose.connect(MONGO_URI, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
  useCreateIndex: true
}).then(() => {
  console.log('Успешное подключение к MongoDB')
  app.listen(PORT, () => console.log(`Сервер запущен на порту ${PORT}`))
}).catch(err => console.log(err))
