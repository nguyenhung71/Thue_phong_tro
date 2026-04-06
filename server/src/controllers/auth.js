import * as authService from "../services/auth";

  export const register = async (req, res) => {
    const { name, phone, email, password, roleId } = req.body;
    try {
      if (!name || !phone || !email || !password || !roleId) {
        return res.status(400).json({
          err: 1,
          msg: "Trường này không được để trống",
        });
      }

      const response = await
  authService.registerService(req.body);
      return res.status(200).json(response);
    } catch (error) {
      return res.status(500).json({
        err: -1,
        msg: "Lỗi ở auth controller: " + error,
      });
    }
  };

  export const login = async (req, res) => {
    const { phone, password } = req.body;
    try {
      if (!phone || !password) {
        return res.status(400).json({
          err: 1,
          msg: "Trường này không được để trống",
        });
      }

      const response = await authService.loginService(req.body);
      return res.status(200).json(response);
    } catch (error) {
      return res.status(500).json({
        err: -1,
        msg: "Lỗi ở auth controller: " + error,
      });
    }
  };

  export const forgotPassword = async (req, res) => {
    const { email } = req.body;
    try {
      if (!email) {
        return res.status(400).json({
          err: 1,
          msg: "Thiếu email",
        });
      }

      const response = await
  authService.forgotPasswordService(email);
      return res.status(200).json(response);
    } catch (error) {
      return res.status(500).json({
        err: -1,
        msg: "Lỗi ở forgot password controller: " + error,
      });
    }
  };

  export const resetPassword = async (req, res) => {
    const { token, newPassword } = req.body;
    try {
      if (!token || !newPassword) {
        return res.status(400).json({
          err: 1,
          msg: "Trường này không được để trống",
        });
      }

      const response = await
  authService.resetPasswordService(req.body);
      return res.status(200).json(response);
    } catch (error) {
      return res.status(500).json({
        err: -1,
        msg: "Lỗi ở reset password controller: " + error,
      });
    }
  };