import db from '../models'
  import bcrypt from 'bcryptjs'
  import jwt from 'jsonwebtoken'
  import { v4 } from 'uuid'
  import { sendResetPasswordEmail } from './email.js'
  import { roles } from '../utils/roles.js'

  require('dotenv').config()

  const hashPassword = (password) =>
    bcrypt.hashSync(password, bcrypt.genSaltSync(12))

  export const registerService = (body) =>
    new Promise(async (resolve, reject) => {
      try {
        const { name, phone, email, password, roleId } = body

        const phoneExists = await db.User.findOne({
          where: { phone },
          raw: true,
        })

        if (phoneExists) {
          return resolve({
            err: 2,
            msg: 'Số điện thoại đã tồn tại',
            token: null,
            roleId: null,
          })
        }

        const emailExists = await db.User.findOne({
          where: { email },
          raw: true,
        })

        if (emailExists) {
          return resolve({
            err: 2,
            msg: 'Email đã tồn tại',
            token: null,
            roleId: null,
          })
        }

        const validRoles = [roles.TENANT, roles.LANDLORD]
        const finalRoleId = validRoles.includes(roleId) ? roleId :
  roles.TENANT

        const user = await db.User.create({
          id: v4(),
          name,
          phone,
          email,
          password: hashPassword(password),
          roleId: finalRoleId,
        })

        const token = jwt.sign(
          {
            id: user.id,
            phone: user.phone,
            email: user.email,
            roleId: user.roleId,
          },
          process.env.SECRET_KEY,
          { expiresIn: '2d' }
        )

        resolve({
          err: 0,
          msg: 'Đăng ký thành công',
          token,
          roleId: user.roleId,
        })
      } catch (error) {
        reject(error)
      }
    })

  export const loginService = (body) =>
    new Promise(async (resolve, reject) => {
      try {
        const { phone, password } = body

        const user = await db.User.findOne({
          where: { phone },
          raw: true,
        })

        if (!user) {
          return resolve({
            err: 2,
            msg: 'Số điện thoại không tồn tại',
            token: null,
            roleId: null,
          })
        }

        const isCorrectPassword = bcrypt.compareSync(password,
  user.password)

        if (!isCorrectPassword) {
          return resolve({
            err: 2,
            msg: 'Sai mat khau',
            token: null,
            roleId: null,
          })
        }

        const token = jwt.sign(
          {
            id: user.id,
            phone: user.phone,
            email: user.email,
            roleId: user.roleId,
          },
          process.env.SECRET_KEY,
          { expiresIn: '2d' }
        )

        resolve({
          err: 0,
          msg: 'Đăng nhập thành công',
          token,
          roleId: user.roleId,
        })
      } catch (error) {
        reject(error)
      }
    })

  export const forgotPasswordService = (email) =>
    new Promise(async (resolve, reject) => {
      try {
        const user = await db.User.findOne({
          where: { email },
          raw: true,
        })

        if (!user) {
          return resolve({
            err: 1,
            msg: 'Email không tồn tại',
          })
        }

        const resetToken = v4()
        const resetTokenExpired = Date.now() + 15 * 60 * 1000

        await db.User.update(
          {
            resetToken,
            resetTokenExpired,
          },
          {
            where: { email },
          }
        )

        await sendResetPasswordEmail(email, resetToken)

        resolve({
          err: 0,
          msg: 'Đã gửi email đặt lại mật khẩu',
        })
      } catch (error) {
        reject(error)
      }
    })

  export const resetPasswordService = ({ token, newPassword }) =>
    new Promise(async (resolve, reject) => {
      try {
        const user = await db.User.findOne({
          where: { resetToken: token },
          raw: false,
        })

        if (!user) {
          return resolve({
            err: 1,
            msg: 'OTP không hợp lệ',
          })
        }

        if (
          !user.resetTokenExpired ||
          Number(user.resetTokenExpired) < Date.now()
        ) {
          return resolve({
            err: 1,
            msg: 'OTP đã hết hạn, vui lòng thử lại',
          })
        }

        user.password = hashPassword(newPassword)
        user.resetToken = null
        user.resetTokenExpired = null

        await user.save()

        resolve({
          err: 0,
          msg: 'Đặt lại mật khẩu thành công',
        })
      } catch (error) {
        reject(error)
      }
    })