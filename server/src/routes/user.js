import express from 'express'
import verifyToken from '../middlewares/verifyToken'
import verifyRole from '../middlewares/verifyRole'
import uploadImage from '../middlewares/uploadImage'
import * as userController from '../controllers/user'

const router = express.Router()

router.use(verifyToken)

router.get('/get-current', userController.getCurrent)
router.put('/', uploadImage.single('avatar'), userController.updateUser)

router.get('/all', verifyRole('ADMIN'), userController.getUsers)
router.get('/detail/:id', verifyRole('ADMIN'), userController.getUserById)
router.post('/create', verifyRole('ADMIN'), userController.createUser)
router.put('/update/:id', verifyRole('ADMIN'), uploadImage.single('avatar'), userController.updateUserByAdmin)
router.delete('/delete/:id', verifyRole('ADMIN'), userController.deleteUserByAdmin)

export default router
