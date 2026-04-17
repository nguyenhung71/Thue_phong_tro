import * as services from '../services/user'

export const getCurrent = async (req, res) => {
    const { id } = req.user
    try {
        const response = await services.getOne(id)
        return res.status(200).json(response)
    } catch (error) {
        return res.status(500).json({ err: -1, msg: 'Failed at user controller: ' + error })
    }
}

export const updateUser = async (req, res) => {
    const { id } = req.user
    try {
        if ((!req.body || Object.keys(req.body).length === 0) && !req.file) {
            return res.status(400).json({ err: 1, msg: 'Thiếu dữ liệu cập nhật.' })
        }
        const response = await services.updateUser(req.body, id, req.file)
        return res.status(200).json(response)
    } catch (error) {
        return res.status(500).json({ err: -1, msg: 'Failed at user controller: ' + error })
    }
}

export const getUsers = async (req, res) => {
    try {
        const response = await services.getUsers()
        return res.status(200).json(response)
    } catch (error) {
        return res.status(500).json({ err: -1, msg: 'Failed at user controller: ' + error })
    }
}

export const getUserById = async (req, res) => {
    const { id } = req.params
    try {
        const response = await services.getUserById(id)
        return res.status(200).json(response)
    } catch (error) {
        return res.status(500).json({ err: -1, msg: 'Failed at user controller: ' + error })
    }
}

export const createUser = async (req, res) => {
    const { name, password, phone, email, zalo, roleId } = req.body
    try {
        if (!name || !password || !phone || !roleId) {
            return res.status(400).json({ err: 1, msg: 'Thiếu dữ liệu đầu vào.' })
        }
        const response = await services.createUser({ name, password, phone, email, zalo, roleId })
        return res.status(200).json(response)
    } catch (error) {
        return res.status(500).json({ err: -1, msg: 'Failed at user controller: ' + error })
    }
}

export const updateUserByAdmin = async (req, res) => {
    const { id } = req.params
    try {
        if ((!req.body || Object.keys(req.body).length === 0) && !req.file) {
            return res.status(400).json({ err: 1, msg: 'Thiếu dữ liệu cập nhật.' })
        }
        const response = await services.updateUserByAdmin(req.body, id, req.file)
        return res.status(200).json(response)
    } catch (error) {
        return res.status(500).json({ err: -1, msg: 'Failed at user controller: ' + error })
    }
}

export const deleteUserByAdmin = async (req, res) => {
    const { id } = req.params
    try {
        const response = await services.deleteUserByAdmin(id)
        return res.status(200).json(response)
    } catch (error) {
        return res.status(500).json({ err: -1, msg: 'Failed at user controller: ' + error })
    }
}
