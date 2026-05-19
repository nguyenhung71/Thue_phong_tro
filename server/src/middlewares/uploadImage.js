import multer from 'multer'
import { CloudinaryStorage } from 'multer-storage-cloudinary'
import cloudinary from '../config/cloudinary'

// const storage = new CloudinaryStorage({
//   cloudinary,
//   params: {
//     folder: 'thue-phong-tro',
//     allowed_formats: ['jpg', 'jpeg', 'png', 'webp'],
//     transformation: [{ width: 800, height: 600, crop: 'limit' }]
//   }
// })

// const uploadImage = multer({
//   storage,
//   limits: { fileSize: 5 * 1024 * 1024 } // 5MB
// })

// export default uploadImage

const storage = multer.memoryStorage()

const uploadImage = multer({
  storage,
  limits: { fileSize: 5 * 1024 * 1024 },
  fileFilter: (req, file, cb) => {
    if (file.mimetype.startsWith('image/')) {
      cb(null, true)
    } else {
      cb(new Error('Chỉ chấp nhận file ảnh!'), false)
    }
  }
})

export default uploadImage