import 'dotenv/config'  
import express from 'express'
import cors from 'cors'
import initRoutes from './src/routes'
import sequelize from './src/config/connectDatabase'

const app = express()

app.use(cors({
  origin: process.env.CLIENT_URL,
  methods: ['GET', 'POST', 'PUT', 'DELETE'],
}))

app.use(express.json())
app.use(express.urlencoded({ extended: true }))

initRoutes(app)

// 🔥 kết nối DB đúng cách
sequelize.authenticate()
  .then(() => console.log("Kết nối DB thành công"))
  .catch(err => console.error("Lỗi DB:", err))

const port = process.env.PORT || 8888

app.listen(port, () => {
  console.log(`Máy chủ đang chạy ở ${port}`)
}).on('error', (error) => {
  console.error('Khởi động máy chủ thất bại:', error.message)
})