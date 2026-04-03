import authRoutes from './auth'
import userRoutes from './user'

const initRoutes = (app) => {
    app.use('/api/v1/auth', authRoutes)
    app.use('/api/v1/user',userRoutes)


    return app.use('/', (req, res) => {
        res.send('server on.')
    })

}

export default initRoutes