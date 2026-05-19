import jwt from 'jsonwebtoken'
  require('dotenv').config()

  const verifyToken = (req, res, next) => {
    const authHeader = req.headers.authorization
    const token = authHeader?.startsWith('Bearer ')
      ? authHeader.split(' ')[1]
      : null

    if (!token) {
      return res.status(401).json({
        err: 1,
        msg: 'Thiếu OTP'
      })
    }

    try {
      const decoded = jwt.verify(token, process.env.SECRET_KEY)
      req.user = decoded
      next()
    } catch (error) {
      return res.status(401).json({
        err: 1,
        msg: 'OTP không hợp lệ'
      })
    }
  }