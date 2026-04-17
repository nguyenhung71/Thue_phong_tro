import db from '../models'
import bcrypt from 'bcryptjs'
import { v4 } from 'uuid'
import cloudinary from '../config/cloudinary'

const hashPassword = (password) => bcrypt.hashSync(password, bcrypt.genSaltSync(10))

const uploadBufferToCloudinary = (file) => new Promise((resolve, reject) => {
    if (!file?.buffer) return resolve(null)
    const dataUri = `data:${file.mimetype};base64,${file.buffer.toString('base64')}`
    cloudinary.uploader.upload(dataUri, { folder: 'thue-phong-tro/avatar' }, (error, result) => {
        if (error) return reject(error)
        resolve(result?.secure_url || null)
    })
})

export const getOne = (id) => new Promise(async (resolve, reject) => {
    try {
        const response = await db.User.findOne({
            where: { id },
            raw: true,
            attributes: { exclude: ['password'] }
        })
        resolve({
            err: response ? 0 : 1,
            msg: response ? 'OK' : 'Không lấy được thông tin người dùng.',
            response
        })
    } catch (error) {
        reject(error)
    }
})

export const updateUser = (payload, id, file) => new Promise(async (resolve, reject) => {
    try {
        const user = await db.User.findOne({ where: { id }, raw: true })
        if (!user) return resolve({ err: 1, msg: 'Người dùng không tồn tại.' })

        if (payload.phone && payload.phone !== user.phone) {
            const existingPhone = await db.User.findOne({ where: { phone: payload.phone }, raw: true })
            if (existingPhone) return resolve({ err: 1, msg: 'Số điện thoại đã tồn tại.' })
        }

        if (payload.email && payload.email !== user.email) {
            const existingEmail = await db.User.findOne({ where: { email: payload.email }, raw: true })
            if (existingEmail) return resolve({ err: 1, msg: 'Email đã tồn tại.' })
        }

        const updateData = {
            name: payload.name,
            phone: payload.phone,
            email: payload.email || null,
            zalo: payload.zalo || null,
        }

        if (payload.password) {
            updateData.password = hashPassword(payload.password)
        }

        if (file) {
            updateData.avatar = await uploadBufferToCloudinary(file)
        }

        const response = await db.User.update(updateData, { where: { id } })
        resolve({
            err: response[0] > 0 ? 0 : 1,
            msg: response[0] > 0 ? 'Cập nhật người dùng thành công.' : 'Không thể cập nhật người dùng.',
        })
    } catch (error) {
        reject(error)
    }
})

export const getUsers = () => new Promise(async (resolve, reject) => {
    try {
        const response = await db.User.findAll({
            attributes: { exclude: ['password'] },
            include: [{ model: db.Role, as: 'role', attributes: ['id', 'roleName'] }],
            order: [['createdAt', 'DESC']]
        })
        resolve({ err: response ? 0 : 1, msg: response ? 'OK' : 'Không lấy được danh sách người dùng.', response })
    } catch (error) {
        reject(error)
    }
})

export const getUserById = (id) => new Promise(async (resolve, reject) => {
    try {
        const response = await db.User.findOne({
            where: { id },
            attributes: { exclude: ['password'] },
            include: [{ model: db.Role, as: 'role', attributes: ['id', 'roleName'] }]
        })
        resolve({ err: response ? 0 : 1, msg: response ? 'OK' : 'Không lấy được người dùng theo id.', response })
    } catch (error) {
        reject(error)
    }
})

export const createUser = (payload) => new Promise(async (resolve, reject) => {
    try {
        const { name, password, phone, email, zalo, roleId } = payload

        const existingPhone = await db.User.findOne({ where: { phone }, raw: true })
        if (existingPhone) return resolve({ err: 1, msg: 'Số điện thoại đã tồn tại.' })

        if (email) {
            const existingEmail = await db.User.findOne({ where: { email }, raw: true })
            if (existingEmail) return resolve({ err: 1, msg: 'Email đã tồn tại.' })
        }

        const role = await db.Role.findOne({ where: { id: roleId }, raw: true })
        if (!role) return resolve({ err: 1, msg: 'Vai trò không tồn tại.' })

        const response = await db.User.create({ id: v4(), name, password: hashPassword(password), phone, email, zalo, roleId })
        resolve({ err: response ? 0 : 1, msg: response ? 'Tạo người dùng thành công.' : 'Không thể tạo người dùng.' })
    } catch (error) {
        reject(error)
    }
})

export const updateUserByAdmin = (payload, id, file) => new Promise(async (resolve, reject) => {
    try {
        const user = await db.User.findOne({ where: { id }, raw: true })
        if (!user) return resolve({ err: 1, msg: 'Người dùng không tồn tại.' })

        if (payload.phone && payload.phone !== user.phone) {
            const existingPhone = await db.User.findOne({ where: { phone: payload.phone }, raw: true })
            if (existingPhone) return resolve({ err: 1, msg: 'Số điện thoại đã tồn tại.' })
        }

        if (payload.email && payload.email !== user.email) {
            const existingEmail = await db.User.findOne({ where: { email: payload.email }, raw: true })
            if (existingEmail) return resolve({ err: 1, msg: 'Email đã tồn tại.' })
        }

        if (payload.roleId) {
            const role = await db.Role.findOne({ where: { id: payload.roleId }, raw: true })
            if (!role) return resolve({ err: 1, msg: 'Vai trò không tồn tại.' })
        }

        const updateData = { ...payload }
        if (payload.password) updateData.password = hashPassword(payload.password)
        if (file) updateData.avatar = await uploadBufferToCloudinary(file)

        const response = await db.User.update(updateData, { where: { id } })
        resolve({ err: response[0] > 0 ? 0 : 1, msg: response[0] > 0 ? 'Cập nhật người dùng thành công.' : 'Không thể cập nhật người dùng.' })
    } catch (error) {
        reject(error)
    }
})

export const deleteUserByAdmin = (id) => new Promise(async (resolve, reject) => {
    try {
        const response = await db.User.destroy({ where: { id } })
        resolve({ err: response > 0 ? 0 : 1, msg: response > 0 ? 'Xóa người dùng thành công.' : 'Không thể xóa người dùng.' })
    } catch (error) {
        reject(error)
    }
})
