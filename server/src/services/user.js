import db from '../models'
import bcrypt from 'bcryptjs'
import { v4 } from 'uuid'

const hashPassword = (password) => bcrypt.hashSync(password, bcrypt.genSaltSync(10))

// USER HIỆN TẠI
export const getOne = (id) => new Promise(async (resolve, reject) => {
    try {
        const response = await db.User.findOne({
            where: { id },
            raw: true,
            attributes: {
                exclude: ['password']
            }
        })
        resolve({
            err: response ? 0 : 1,
            msg: response ? 'OK' : 'Failed to get user.',
            response
        })
    } catch (error) {
        reject(error)
    }
})

export const updateUser = (payload, id) => new Promise(async (resolve, reject) => {
    try {
        const response = await db.User.update(payload, {
            where: { id }
        })
        resolve({
            err: response[0] > 0 ? 0 : 1,
            msg: response[0] > 0 ? 'Updated' : 'Failed to update user.',
            response
        })
    } catch (error) {
        reject(error)
    }
})

// ADMIN - GET ALL USERS
export const getUsers = () => new Promise(async (resolve, reject) => {
    try {
        const response = await db.User.findAll({
            attributes: {
                exclude: ['password']
            },
            include: [
                {
                    model: db.Role,
                    as: 'role',
                    attributes: ['id', 'roleName']
                }
            ],
            order: [['createdAt', 'DESC']]
        })

        resolve({
            err: response ? 0 : 1,
            msg: response ? 'OK' : 'Failed to get users.',
            response
        })
    } catch (error) {
        reject(error)
    }
})

// ADMIN - GET USER BY ID
export const getUserById = (id) => new Promise(async (resolve, reject) => {
    try {
        const response = await db.User.findOne({
            where: { id },
            attributes: {
                exclude: ['password']
            },
            include: [
                {
                    model: db.Role,
                    as: 'role',
                    attributes: ['id', 'roleName']
                }
            ]
        })

        resolve({
            err: response ? 0 : 1,
            msg: response ? 'OK' : 'Failed to get user by id.',
            response
        })
    } catch (error) {
        reject(error)
    }
})

// ADMIN - CREATE USER
export const createUser = (payload) => new Promise(async (resolve, reject) => {
    try {
        const {name, password, phone, zalo, roleId } = payload

        const existingUser = await db.User.findOne({
            where: { phone },
            raw: true
        })

        if (existingUser) {
            return resolve({
                err: 1,
                msg: 'Số điện thoại đã tồn tại.'
            })
        }

        const role = await db.Role.findOne({
            where: { id: roleId },
            raw: true
        })

        if (!role) {
            return resolve({
                err: 1,
                msg: 'Vai trò không tồn tại.'
            })
        }

        const response = await db.User.create({
            id: v4(),
            name,
            password: hashPassword(password),
            phone,
            zalo,
            roleId
        })

        resolve({
            err: response ? 0 : 1,
            msg: response ? 'Created' : 'Failed to create user.',
            response
        })
    } catch (error) {
        reject(error)
    }
})

// ADMIN - UPDATE USER BY ID
export const updateUserByAdmin = (payload, id) => new Promise(async (resolve, reject) => {
    try {
        const user = await db.User.findOne({
            where: { id },
            raw: true
        })

        if (!user) {
            return resolve({
                err: 1,
                msg: 'User không tồn tại.'
            })
        }

        if (payload.phone && payload.phone !== user.phone) {
            const existingPhone = await db.User.findOne({
                where: { phone: payload.phone },
                raw: true
            })

            if (existingPhone) {
                return resolve({
                    err: 1,
                    msg: 'Số điện thoại đã tồn tại.'
                })
            }
        }

        if (payload.roleId) {
            const role = await db.Role.findOne({
                where: { id: payload.roleId },
                raw: true
            })

            if (!role) {
                return resolve({
                    err: 1,
                    msg: 'Vai trò không tồn tại.'
                })
            }
        }

        const updateData = { ...payload }

        if (payload.password) {
            updateData.password = hashPassword(payload.password)
        }

        const response = await db.User.update(updateData, {
            where: { id }
        })

        resolve({
            err: response[0] > 0 ? 0 : 1,
            msg: response[0] > 0 ? 'Updated' : 'Failed to update user.',
            response
        })
    } catch (error) {
        reject(error)
    }
})

// ADMIN - DELETE USER
export const deleteUserByAdmin = (id) => new Promise(async (resolve, reject) => {
    try {
        const response = await db.User.destroy({
            where: { id }
        })

        resolve({
            err: response > 0 ? 0 : 1,
            msg: response > 0 ? 'Deleted' : 'Failed to delete user.',
            response
        })
    } catch (error) {
        reject(error)
    }
})