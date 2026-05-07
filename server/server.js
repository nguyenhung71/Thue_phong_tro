import 'dotenv/config'
import express from 'express'
import cors from 'cors'
import initRoutes from './src/routes'
import sequelize from './src/config/connectDatabase'
import ensureDefaultAdmin from './src/bootstrap/ensureDefaultAdmin'

const app = express()

app.use(cors({
  origin: process.env.CLIENT_URL,
  methods: ['GET', 'POST', 'PUT', 'DELETE'],
}))

app.use(express.json())
app.use(express.urlencoded({ extended: true }))

initRoutes(app)

const port = process.env.PORT || 8888

const startServer = async () => {
  try {
    await sequelize.authenticate()
    console.log('Ket noi DB thanh cong')

    await ensureDefaultAdmin()

    app.listen(port, () => {
      console.log(`May chu dang chay o ${port}`)
    }).on('error', (error) => {
      console.error('Khoi dong may chu that bai:', error.message)
    })
  } catch (error) {
    console.error('Loi khoi dong server:', error)
  }
}

startServer()
