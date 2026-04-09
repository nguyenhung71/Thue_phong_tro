import bcrypt from "bcryptjs";
import { QueryTypes } from "sequelize";
import * as authService from "../services/auth";
import sequelize from "../config/connectDatabase";
import { sendOtpEmail } from "../services/email";
import { generateOtp, getOtpExpiry, isOtpValid } from "../utils/otpHelper";

const getPasswordError = (password) => {
  if (password.length < 8) {
    return "Mat khau phai co it nhat 8 ky tu";
  }

  if (!/[A-Z]/.test(password)) {
    return "Mat khau phai co it nhat 1 chu hoa";
  }

  if (!/[a-z]/.test(password)) {
    return "Mat khau phai co it nhat 1 chu thuong";
  }

  if (!/\d/.test(password)) {
    return "Mat khau phai co it nhat 1 so";
  }

  if (!/[^A-Za-z\d]/.test(password)) {
    return "Mat khau phai co it nhat 1 ky tu dac biet";
  }

  return "";
};

export const register = async (req, res) => {
  const { name, phone, email, password, roleId } = req.body;

  try {
    if (!name || !phone || !email || !password || !roleId) {
      return res.status(400).json({
        err: 1,
        msg: "Truong nay khong duoc de trong",
      });
    }

    const passwordError = getPasswordError(password);
    if (passwordError) {
      return res.status(400).json({
        err: 1,
        msg: passwordError,
      });
    }

    const response = await authService.registerService(req.body);
    return res.status(200).json(response);
  } catch (error) {
    return res.status(500).json({
      err: -1,
      msg: "Loi o auth controller: " + error,
    });
  }
};

export const login = async (req, res) => {
  const { phone, password } = req.body;

  try {
    if (!phone || !password) {
      return res.status(400).json({
        err: 1,
        msg: "Truong nay khong duoc de trong",
      });
    }

    const response = await authService.loginService(req.body);
    return res.status(200).json(response);
  } catch (error) {
    return res.status(500).json({
      err: -1,
      msg: "Loi o auth controller: " + error,
    });
  }
};

export const sendOtp = async (req, res) => {
  const email = req.body?.email?.trim()?.toLowerCase();

  if (!email) {
    return res.status(400).json({
      err: 1,
      msg: "Email khong duoc de trong",
    });
  }

  try {
    const user = await sequelize.query(
      "SELECT id, email FROM users WHERE email = ? LIMIT 1",
      {
        replacements: [email],
        type: QueryTypes.SELECT,
      }
    );

    if (user.length === 0) {
      return res.status(200).json({
        err: 1,
        msg: "Email khong ton tai",
      });
    }

    const otp = generateOtp();
    const expiresAt = getOtpExpiry(process.env.OTP_EXPIRE_MINUTES || 5);

    await sequelize.query("DELETE FROM password_reset_otps WHERE email = ?", {
      replacements: [email],
      type: QueryTypes.DELETE,
    });

    await sequelize.query(
      `INSERT INTO password_reset_otps (user_id, email, otp, expires_at, is_verified)
       VALUES (?, ?, ?, ?, 0)`,
      {
        replacements: [user[0].id, email, otp, expiresAt],
        type: QueryTypes.INSERT,
      }
    );

    await sendOtpEmail(email, otp);

    return res.status(200).json({
      err: 0,
      msg: "OTP da duoc gui toi email cua ban",
    });
  } catch (error) {
    console.error("sendOtp error:", error);
    return res.status(500).json({
      err: -1,
      msg: "Loi server, vui long thu lai sau",
    });
  }
};

export const verifyOtp = async (req, res) => {
  const email = req.body?.email?.trim()?.toLowerCase();
  const otp = req.body?.otp?.trim();

  if (!email || !otp) {
    return res.status(400).json({
      err: 1,
      msg: "Email va OTP khong duoc de trong",
    });
  }

  try {
    const rows = await sequelize.query(
      `SELECT id, expires_at
       FROM password_reset_otps
       WHERE email = ? AND otp = ?
       ORDER BY created_at DESC
       LIMIT 1`,
      {
        replacements: [email, otp],
        type: QueryTypes.SELECT,
      }
    );

    if (rows.length === 0) {
      return res.status(200).json({
        err: 1,
        msg: "OTP khong chinh xac",
      });
    }

    const record = rows[0];

    if (!isOtpValid(record.expires_at)) {
      return res.status(200).json({
        err: 1,
        msg: "OTP da het han, vui long yeu cau ma moi",
      });
    }

    await sequelize.query(
      "UPDATE password_reset_otps SET is_verified = 1 WHERE id = ?",
      {
        replacements: [record.id],
        type: QueryTypes.UPDATE,
      }
    );

    return res.status(200).json({
      err: 0,
      msg: "Xac thuc OTP thanh cong",
    });
  } catch (error) {
    console.error("verifyOtp error:", error);
    return res.status(500).json({
      err: -1,
      msg: "Loi server, vui long thu lai sau",
    });
  }
};

export const resetPassword = async (req, res) => {
  const email = req.body?.email?.trim()?.toLowerCase();
  const otp = req.body?.otp?.trim();
  const { newPassword, confirmPassword } = req.body;

  if (!email || !otp || !newPassword || !confirmPassword) {
    return res.status(400).json({
      err: 1,
      msg: "Vui long nhap day du thong tin",
    });
  }

  if (newPassword !== confirmPassword) {
    return res.status(400).json({
      err: 1,
      msg: "Mat khau xac nhan khong khop",
    });
  }

  const passwordError = getPasswordError(newPassword);
  if (passwordError) {
    return res.status(400).json({
      err: 1,
      msg: passwordError,
    });
  }

  try {
    const rows = await sequelize.query(
      `SELECT id, user_id, expires_at
       FROM password_reset_otps
       WHERE email = ? AND otp = ? AND is_verified = 1
       ORDER BY created_at DESC
       LIMIT 1`,
      {
        replacements: [email, otp],
        type: QueryTypes.SELECT,
      }
    );

    if (rows.length === 0) {
      return res.status(200).json({
        err: 1,
        msg: "Đặt lại mật khẩu không thành công",
      });
    }

    const record = rows[0];

    if (!isOtpValid(record.expires_at)) {
      return res.status(200).json({
        err: 1,
        msg: "OTP da het han, vui long yeu cau ma moi",
      });
    }

    const hashedPassword = await bcrypt.hash(newPassword, 10);

    await sequelize.query("UPDATE users SET password = ? WHERE id = ?", {
      replacements: [hashedPassword, record.user_id],
      type: QueryTypes.UPDATE,
    });

    await sequelize.query("DELETE FROM password_reset_otps WHERE user_id = ?", {
      replacements: [record.user_id],
      type: QueryTypes.DELETE,
    });

    return res.status(200).json({
      err: 0,
      msg: "Đặt lại mật khẩu thành công",
    });
  } catch (error) {
    console.error("resetPassword error:", error);
    return res.status(500).json({
      err: -1,
      msg: "Loi server, vui long thu lai sau",
    });
  }
};
