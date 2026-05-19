import React, { useEffect, useMemo, useState } from 'react'
import { useParams } from 'react-router-dom'
import { toast } from 'react-toastify'
import { Address, Button, Overview } from '../../components'
import { apiCreatePost, apiGetPostById, apiUpdatePost } from '../../services'
import icons from '../../ultils/icons'

const { BsCameraFill, ImBin } = icons

const initialPayload = {
  categoryCode: '',
  title: '',
  priceNumber: '',
  areaNumber: '',
  images: [],
  address: '',
  priceCode: '',
  areaCode: '',
  description: '',
  target: '',
  province: '',
}

const managePostsPath = '/he-thong/quan-ly-bai-dang'

const CreatePost = () => {
  const { postId } = useParams()
  const isEditMode = Boolean(postId)
  const [payload, setPayload] = useState(initialPayload)
  const [selectedFiles, setSelectedFiles] = useState([])
  const [imagesPreview, setImagesPreview] = useState([])
  const [isLoading, setIsLoading] = useState(false)
  const [isFetching, setIsFetching] = useState(false)

  const mapAddress = useMemo(() => [payload.address, payload.province].filter(Boolean).join(', '), [payload.address, payload.province])
  const mapSrc = mapAddress ? `https://www.google.com/maps?q=${encodeURIComponent(mapAddress)}&output=embed` : ''
  const redirectToManagePosts = () => window.location.assign(managePostsPath)

  useEffect(() => {
    return () => {
      imagesPreview.forEach((item) => {
        if (item.isLocal) URL.revokeObjectURL(item.url)
      })
    }
  }, [imagesPreview])

  useEffect(() => {
    if (!isEditMode) return

    const fetchPostDetail = async () => {
      setIsFetching(true)
      try {
        const response = await apiGetPostById(postId)
        const post = response?.data?.response

        if (response?.data?.err !== 0 || !post) {
          toast.error(response?.data?.msg || 'Không tìm thấy bài đăng cần chỉnh sửa.')
          redirectToManagePosts()
          return
        }

        const addressParts = (post.address || '').split(',').map((item) => item.trim()).filter(Boolean)
        const province = addressParts.length > 0 ? addressParts[addressParts.length - 1] : ''
        const streetAddress = addressParts.length > 1 ? addressParts.slice(0, -1).join(', ') : (post.address || '')
        const serverImages = (post.images?.image || '')
          .split(',')
          .map((item) => item.trim())
          .filter(Boolean)
          .map((url, index) => ({ id: `server-${index}`, url, name: `image-${index + 1}`, isLocal: false }))

        setPayload({
          categoryCode: post.categoryCode || '',
          title: post.title || '',
          priceNumber: post.attributes?.price || '',
          areaNumber: post.attributes?.acreage || '',
          images: serverImages.map((item) => item.url),
          address: streetAddress,
          priceCode: '',
          areaCode: '',
          description: post.description || '',
          target: post.overview?.target || '',
          province,
        })
        setImagesPreview(serverImages)
        setSelectedFiles([])
      } catch (error) {
        toast.error(error?.response?.data?.msg || 'Không thể tải dữ liệu bài đăng.')
        redirectToManagePosts()
      } finally {
        setIsFetching(false)
      }
    }

    fetchPostDetail()
  }, [isEditMode, postId])

  const handleFiles = (e) => {
    const files = Array.from(e.target.files || [])
    if (!files.length) return

    const nextPreviewItems = files.map((file) => ({
      id: `${file.name}-${file.lastModified}`,
      url: URL.createObjectURL(file),
      name: file.name,
      isLocal: true,
    }))

    setSelectedFiles(files)
    setImagesPreview(nextPreviewItems)
    setPayload((prev) => ({ ...prev, images: nextPreviewItems.map((item) => item.url) }))
  }

  const handleDeleteImage = (imageId) => {
    setImagesPreview((prev) => {
      const target = prev.find((item) => item.id === imageId)
      if (target?.isLocal) URL.revokeObjectURL(target.url)
      return prev.filter((item) => item.id !== imageId)
    })

    setSelectedFiles((prev) => prev.filter((file) => `${file.name}-${file.lastModified}` !== imageId))
    setPayload((prev) => ({
      ...prev,
      images: prev.images?.filter((item) => !imagesPreview.find((preview) => preview.id === imageId && preview.url === item)),
    }))
  }

  const handleSubmit = async () => {
    if (!payload.title || !payload.address || !payload.categoryCode || !payload.description || !payload.priceNumber || !payload.areaNumber) {
      toast.error('Vui lòng nhập đầy đủ thông tin bắt buộc trước khi lưu bài đăng.')
      return
    }

    try {
      setIsLoading(true)
      const formData = new FormData()
      formData.append('title', payload.title)
      formData.append('address', payload.address)
      formData.append('province', payload.province)
      formData.append('district', '')
      formData.append('categoryCode', payload.categoryCode)
      formData.append('description', payload.description)
      formData.append('price', payload.priceNumber)
      formData.append('acreage', payload.areaNumber)
      formData.append('target', payload.target)

      selectedFiles.forEach((file) => {
        formData.append('images', file)
      })

      const response = isEditMode ? await apiUpdatePost(postId, formData) : await apiCreatePost(formData)

      if (response?.data?.err === 0) {
        toast.success(isEditMode ? 'Cập nhật bài đăng thành công.' : 'Tạo bài đăng thành công.')
        if (!isEditMode) {
          imagesPreview.forEach((item) => {
            if (item.isLocal) URL.revokeObjectURL(item.url)
          })
          setSelectedFiles([])
          setImagesPreview([])
          setPayload(initialPayload)
          return
        }

        redirectToManagePosts()
        return
      }

      toast.error(response?.data?.msg || 'Không thể lưu bài đăng.')
    } catch (error) {
      const message = error?.response?.data?.msg || error?.message || 'Không thể lưu bài đăng.'
      toast.error(message)
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <div className='px-6'>
      <h1 className='text-3xl font-medium py-4 border-b border-gray-200'>{isEditMode ? 'Chỉnh sửa bài đăng' : 'Đăng tin mới'}</h1>
      {isFetching ? (
        <div className='py-6 text-gray-600'>Đang tải dữ liệu bài đăng...</div>
      ) : (
        <div className='flex gap-4'>
          <div className='py-4 flex flex-col gap-8 flex-auto'>
            <Address payload={payload} setPayload={setPayload} />
            <Overview payload={payload} setPayload={setPayload} />
            <div className='w-full mb-6'>
              <h2 className='font-semibold text-xl py-4'>Hình ảnh</h2>
              <small>
                {isEditMode
                  ? 'Bạn có thể chọn ảnh mới để thay thế bộ ảnh hiện tại. Nếu không chọn ảnh mới, hệ thống sẽ giữ nguyên ảnh cũ.'
                  : 'Chọn ảnh từ máy. Ảnh sẽ được tải lên khi bạn bấm tạo bài đăng.'}
              </small>
              <div className='w-full'>
                <label className='w-full border-2 h-[200px] my-4 gap-4 flex flex-col items-center justify-center border-gray-400 border-dashed rounded-md cursor-pointer' htmlFor='file'>
                  <div className='flex flex-col items-center justify-center'>
                    <BsCameraFill color='blue' size={50} />
                    Thêm ảnh
                  </div>
                </label>
                <input onChange={handleFiles} hidden type='file' id='file' multiple accept='image/*' />
                <div className='w-full'>
                  <h3 className='font-medium py-4'>Ảnh đang hiển thị</h3>
                  <div className='flex gap-4 items-center flex-wrap'>
                    {imagesPreview.map((item) => (
                      <div key={item.id} className='relative w-[180px] h-[180px]'>
                        <img src={item.url} alt={item.name} className='w-full h-full object-cover rounded-md' />
                        {item.isLocal && (
                          <span title='Xóa' onClick={() => handleDeleteImage(item.id)} className='absolute top-0 right-0 p-2 cursor-pointer bg-gray-300 hover:bg-gray-400 rounded-full'>
                            <ImBin />
                          </span>
                        )}
                      </div>
                    ))}
                    {imagesPreview.length === 0 && <p className='text-sm text-gray-500'>Chưa có ảnh nào được chọn.</p>}
                  </div>
                </div>
              </div>
            </div>
            <Button onClick={handleSubmit} text={isLoading ? (isEditMode ? 'Đang cập nhật...' : 'Đang tạo...') : (isEditMode ? 'Lưu cập nhật' : 'Tạo mới')} bgColor='bg-green-600' />
            <div className='h-[500px]'></div>
          </div>
          <div className='w-[30%] flex-none'>
            <h2 className='font-semibold text-xl py-4'>Bản đồ</h2>
            <div className='overflow-hidden rounded-md border border-gray-300 bg-white'>
              {mapSrc ? (
                <iframe title='map-preview' src={mapSrc} className='w-full h-[420px]' loading='lazy' />
              ) : (
                <div className='h-[420px] flex items-center justify-center text-sm text-gray-500 px-6 text-center'>Nhập địa chỉ để xem vị trí hiển thị trên bản đồ.</div>
              )}
            </div>
          </div>
        </div>
      )}
    </div>
  )
}

export default CreatePost
