import express from 'express'
import * as postController from '../controllers/post'
import verifyToken from '../middlewares/verifyToken'
import verifyRole from '../middlewares/verifyRole'
import uploadImage from '../middlewares/uploadImage'

const router = express.Router()

router.get('/nha-nguyen-can', postController.getPostsByCategory)
router.get('/can-ho-dich-vu', postController.getPostsByCategory)
router.get('/can-ho-chung-cu', postController.getPostsByCategory)
router.get('/can-ho-mini', postController.getPostsByCategory)
router.get('/detail/:id', postController.getPostById)
router.get('/filter', postController.filterPosts)
router.get('/filter-data', postController.getFilterData)
router.get('/limit', postController.getPostsLimit)
router.get('/new-post', postController.getNewPosts)

router.use(verifyToken)

router.get('/all', verifyRole('ADMIN'), postController.getPosts)
router.delete('/admin/delete/:id', verifyRole('ADMIN'), postController.deletePost)
router.put('/admin/update/:id', verifyRole('ADMIN'), uploadImage.array('images', 10), postController.updatePost)

router.get('/my-posts', verifyRole('LANDLORD', 'ADMIN'), postController.getPostsByUser)
router.put('/update/:id', verifyRole('LANDLORD', 'ADMIN'), uploadImage.array('images', 10), postController.updatePost)
router.delete('/delete/:id', verifyRole('LANDLORD', 'ADMIN'), postController.deletePost)
router.post('/create', verifyRole('LANDLORD', 'ADMIN'), uploadImage.array('images', 10), postController.createPost)

export default router
