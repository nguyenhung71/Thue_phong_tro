import jwt from "jsonwebtoken";
import db from "../models";

const verifyToken = async (req, res, next) => {
  try {
    const authHeader = req.headers.authorization;

    if (!authHeader || !authHeader.startsWith("Bearer ")) {
      return res.status(401).json({
        err: 1,
        msg: "Thiếu token",
      });
    }

    const token = authHeader.split(" ")[1];
    const decoded = jwt.verify(token, process.env.SECRET_KEY);

    const user = await db.User.findByPk(decoded.id);

    if (!user) {
      return res.status(401).json({
        err: 1,
        msg: "Người dùng không tồn tại",
      });
    }

    req.user = user;
    next();
  } catch (error) {
    return res.status(401).json({
      err: 1,
      msg: "Token không hợp lệ",
    });
  }
};

export default verifyToken;