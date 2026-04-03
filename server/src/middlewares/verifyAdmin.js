import db from '../models'

const verifyAdmin = async (req, res, next) => {
    try {
        const { roleId } = req.user

        const role = await db.Role.findOne({
            where: { id: roleId },
            raw: true
        })

        if (!role) {
            return res.status(403).json({
                err: 1,
                msg: 'Role not found'
            })
        }

        if (role.roleName !== 'ADMIN') {
            return res.status(403).json({
                err: 1,
                msg: 'Bạn không có quyền truy cập chức năng này'
            })
        }

        next()
    } catch (error) {
        return res.status(500).json({
            err: -1,
            msg: 'Failed at verifyAdmin middleware: ' + error
        })
    }
}

export default verifyAdmin