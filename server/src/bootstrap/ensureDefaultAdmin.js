import bcrypt from 'bcryptjs'
import db from '../models'

const DEFAULT_ADMIN = {
  id: '00000-00001',
  name: 'Administrator',
  email: 'admin@gmail.com',
  phone: '19006789',
  password: 'Admin@123',
  roleId: 'ADMIN',
}

const hashPassword = (password) => bcrypt.hashSync(password, bcrypt.genSaltSync(10))

const ensureAdminRole = async () => {
  const role = await db.Role.findOne({ where: { id: DEFAULT_ADMIN.roleId }, raw: true })
  if (role) return

  await db.Role.create({
    id: DEFAULT_ADMIN.roleId,
    roleName: DEFAULT_ADMIN.roleId,
  })
}

const ensureAdminUser = async () => {
  const existingUser = await db.User.findOne({
    where: {
      [db.Sequelize.Op.or]: [
        { phone: DEFAULT_ADMIN.phone },
        { email: DEFAULT_ADMIN.email },
      ],
    },
    raw: true,
  })

  const payload = {
    id: existingUser?.id || DEFAULT_ADMIN.id,
    name: DEFAULT_ADMIN.name,
    email: DEFAULT_ADMIN.email,
    phone: DEFAULT_ADMIN.phone,
    password: hashPassword(DEFAULT_ADMIN.password),
    roleId: DEFAULT_ADMIN.roleId,
  }

  if (!existingUser) {
    await db.User.create(payload)
    console.log('Default admin account created.')
    return
  }

  await db.User.update(payload, { where: { id: existingUser.id } })
  console.log('Default admin account verified.')
}

const ensureDefaultAdmin = async () => {
  await ensureAdminRole()
  await ensureAdminUser()
}

export default ensureDefaultAdmin
