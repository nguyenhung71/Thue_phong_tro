import db from '../models'

const verifyRole = (...allowedRoles) => async (req, res, next) => {
  try {
    const { roleId } = req.user

    if (allowedRoles.includes(roleId)) {
      return next()
    }

    const role = await db.Role.findOne({
      where: { id: roleId },
      raw: true
    })

    if (!role) {
      return res.status(403).json({ err: 1, msg: 'Role not found' })
    }

    if (!allowedRoles.includes(role.roleName) && !allowedRoles.includes(role.id)) {
      return res.status(403).json({ err: 1, msg: 'Bạn không có quyền truy cập chức năng này' })
    }

    next()
  } catch (error) {
    return res.status(500).json({ err: -1, msg: 'Failed at verifyRole middleware: ' + error })
  }
}

export default verifyRole