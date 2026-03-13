import authRoutes from './auth'

const initRoutes = (app) => {
    app.use('/api/v1/auth', authRoutes)


    return app.use('/', (req, res) => {
        res.send('server on.')
    })

}

export default initRoutes