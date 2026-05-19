import authRoutes from './auth'
import categoryRoutes from './category'
import postRoutes from './post'
import userRoutes from './user'

const initRoutes = (app) => {
    app.use('/api/v1/auth', authRoutes)
    app.use('/api/v1/user', userRoutes)
    app.use('/api/v1/category', categoryRoutes)
    app.use('/api/v1/posts', postRoutes)
    app.use('/api/v1/post', postRoutes)

    return app.use('/', (req, res) => {
        res.send('server on.')
    })
}

export default initRoutes
