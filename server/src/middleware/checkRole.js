  const checkRole = (allowedRoles) => {
    return (req, res, next) => {
      if (!req.user || !allowedRoles.includes(req.user.roleId)) {
        return res.status(403).json({
          err: 1,
          msg: 'Không có quyền truy cập'
        })
      }
      next()
    }
  }

  export default checkRole