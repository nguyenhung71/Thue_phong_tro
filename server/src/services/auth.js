import db from "../models";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import { v4 } from "uuid";
import { roles } from "../utils/roles.js";

require("dotenv").config();

const hashPassword = (password) =>
  bcrypt.hashSync(password, bcrypt.genSaltSync(12));

export const registerService = (body) =>
  new Promise(async (resolve, reject) => {
    try {
      const { name, phone, email, password, roleId } = body;

      const phoneExists = await db.User.findOne({
        where: { phone },
        raw: true,
      });

      if (phoneExists) {
        return resolve({
          err: 2,
          msg: "Số điện thoại đã tồn tại",
        });
      }

      const emailExists = await db.User.findOne({
        where: { email },
        raw: true,
      });

      if (emailExists) {
        return resolve({
          err: 2,
          msg: "Email đã tồn tại",
        });
      }

      const validRoles = [roles.TENANT, roles.LANDLORD];
      const finalRoleId = validRoles.includes(roleId) ? roleId : roles.TENANT;

      await db.User.create({
        id: v4(),
        name,
        phone,
        email,
        password: hashPassword(password),
        roleId: finalRoleId,
      });

      resolve({
        err: 0,
        msg: "Đăng ký thành công",
      });
    } catch (error) {
      reject(error);
    }
  });

export const loginService = (body) =>
  new Promise(async (resolve, reject) => {
    try {
      const { phone, password } = body;

      const user = await db.User.findOne({
        where: { phone },
        raw: true,
      });

      if (!user) {
        return resolve({
          err: 2,
          msg: "Số điện thoại không tồn tại",
          token: null,
          roleId: null,
        });
      }

      const isCorrectPassword = bcrypt.compareSync(password, user.password);

      if (!isCorrectPassword) {
        return resolve({
          err: 2,
          msg: "Sai mật khẩu",
          token: null,
          roleId: null,
        });
      }

      const token = jwt.sign(
        {
          id: user.id,
          phone: user.phone,
          email: user.email,
          roleId: user.roleId,
        },
        process.env.SECRET_KEY,
        { expiresIn: "2d" }
      );

      resolve({
        err: 0,
        msg: "Đăng nhập thành công",
        token,
        roleId: user.roleId,
      });
    } catch (error) {
      reject(error);
    }
  });
