import authRoutes from './auth'
import userRoutes from './user'
import postRoutes from './post'

const initRoutes = (app) => {
    app.use('/api/v1/auth', authRoutes)
    app.use('/api/v1/user', userRoutes)
    app.use('/api/v1/post', postRoutes)
    return app.use('/', (req, res) => {
        res.send('server on.')
    })
}

export default initRoutes