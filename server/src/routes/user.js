import express from 'express'
import verifyToken from '../middlewares/verifyToken'
import verifyAdmin from '../middlewares/verifyAdmin'
import * as userController from '../controllers/user'

const router = express.Router()

router.use(verifyToken)

router.get('/get-current', userController.getCurrent)
router.put('/', userController.updateUser)

router.get('/all', verifyAdmin, userController.getUsers)
router.get('/detail/:id', verifyAdmin, userController.getUserById)
router.post('/create', verifyAdmin, userController.createUser)
router.put('/update/:id', verifyAdmin, userController.updateUserByAdmin)
router.delete('/delete/:id', verifyAdmin, userController.deleteUserByAdmin)

export default router