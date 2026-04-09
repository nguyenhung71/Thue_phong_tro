import express from 'express'
import verifyToken from '../middlewares/verifyToken'
import verifyRole from '../middlewares/verifyRole'
import * as postController from '../controllers/post'

const router = express.Router()

router.use(verifyToken)

// Public (có token)
router.get('/detail/:id', postController.getPostById)
router.get('/filter', postController.filterPosts)
router.get('/filter-data', postController.getFilterData)

// ADMIN only
router.get('/all', verifyRole('ADMIN'), postController.getPosts)
router.delete('/admin/delete/:id', verifyRole('ADMIN'), postController.deletePost)
router.put('/admin/update/:id', verifyRole('ADMIN'), postController.updatePost)

// LANDLORD
router.get('/my-posts', verifyRole('LANDLORD', 'ADMIN'), postController.getPostsByUser)
router.post('/create', verifyRole('LANDLORD', 'ADMIN'), postController.createPost)
router.put('/update/:id', verifyRole('LANDLORD', 'ADMIN'), postController.updatePost)
router.delete('/delete/:id', verifyRole('LANDLORD', 'ADMIN'), postController.deletePost)

export default router