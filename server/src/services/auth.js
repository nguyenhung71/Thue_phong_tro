import db from '../models'
import bcrypt from 'bcryptjs'
import { raw } from 'express'
import jwt from 'jsonwebtoken'
import { v4 } from 'uuid'
require ('dotenv').config()

const hashPassword = password => bcrypt.hashSync(password, bcrypt.genSaltSync(12))
export const registerService = (body) => new Promise(async (resolve, reject) => {
    try {
        const response = await db.User.findOrCreate({
            where: { phone: body.phone },
            defaults: {
                name: body.name,
                phone: body.phone,
                password: hashPassword(body.password),
                id: v4()
            }
        })
        const token = response[1] && jwt.sign({ id: response[0].id, phone: response[0].phone }, process.env.SECRET_KEY, { expiresIn: '2d' })

        resolve({
            err: token ? 0 : 2,
            msg: token ? 'Register successfully' : 'Phone number already exists',
            token: token || null
        })
    } catch (error) {
        reject(error)
    }
})
export const loginService = (body) => new Promise(async (resolve, reject) => {
    try {

        const response = await db.User.findOne({
            where: { phone: body.phone },
            raw: true
        })

        const isCorrectPassword = response && bcrypt.compareSync(body.password, response.password)

        const token = isCorrectPassword && jwt.sign(
            { id: response.id, phone: response.phone },
            process.env.SECRET_KEY,
            { expiresIn: '2d' }
        )

        resolve({
            err: token ? 0 : 2,
            msg: token
                ? 'Đăng nhập thành công'
                : response
                    ? 'Sai mật khẩu'
                    : 'Số điện thoại không tồn tại',
            token: token || null
        })

    } catch (error) {
        reject(error)
    }
})