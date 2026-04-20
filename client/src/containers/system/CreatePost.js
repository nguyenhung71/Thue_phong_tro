import React, { useEffect, useMemo, useState } from 'react'
import { useParams } from 'react-router-dom'
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
          window.alert(response?.data?.msg || 'Kh\u00f4ng t\u00ecm th\u1ea5y b\u00e0i \u0111\u0103ng c\u1ea7n ch\u1ec9nh s\u1eeda.')
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
        window.alert(error?.response?.data?.msg || 'Kh\u00f4ng th\u1ec3 t\u1ea3i d\u1eef li\u1ec7u b\u00e0i \u0111\u0103ng.')
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
      window.alert('Vui l\u00f2ng nh\u1eadp \u0111\u1ea7y \u0111\u1ee7 th\u00f4ng tin b\u1eaft bu\u1ed9c tr\u01b0\u1edbc khi l\u01b0u b\u00e0i \u0111\u0103ng.')
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
        window.alert(isEditMode ? 'C\u1eadp nh\u1eadt b\u00e0i \u0111\u0103ng th\u00e0nh c\u00f4ng.' : 'T\u1ea1o b\u00e0i \u0111\u0103ng th\u00e0nh c\u00f4ng.')
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

      window.alert(response?.data?.msg || 'Kh\u00f4ng th\u1ec3 l\u01b0u b\u00e0i \u0111\u0103ng.')
    } catch (error) {
      const message = error?.response?.data?.msg || error?.message || 'Kh\u00f4ng th\u1ec3 l\u01b0u b\u00e0i \u0111\u0103ng.'
      window.alert(message)
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <div className='px-6'>
      <h1 className='text-3xl font-medium py-4 border-b border-gray-200'>{isEditMode ? 'Ch\u1ec9nh s\u1eeda b\u00e0i \u0111\u0103ng' : '\u0110\u0103ng tin m\u1edbi'}</h1>
      {isFetching ? (
        <div className='py-6 text-gray-600'>{'\u0110ang t\u1ea3i d\u1eef li\u1ec7u b\u00e0i \u0111\u0103ng...'}</div>
      ) : (
        <div className='flex gap-4'>
          <div className='py-4 flex flex-col gap-8 flex-auto'>
            <Address payload={payload} setPayload={setPayload} />
            <Overview payload={payload} setPayload={setPayload} />
            <div className='w-full mb-6'>
              <h2 className='font-semibold text-xl py-4'>{'H\u00ecnh \u1ea3nh'}</h2>
              <small>{isEditMode ? 'B\u1ea1n c\u00f3 th\u1ec3 ch\u1ecdn \u1ea3nh m\u1edbi \u0111\u1ec3 thay th\u1ebf b\u1ed9 \u1ea3nh hi\u1ec7n t\u1ea1i. N\u1ebfu kh\u00f4ng ch\u1ecdn \u1ea3nh m\u1edbi, h\u1ec7 th\u1ed1ng s\u1ebd gi\u1eef nguy\u00ean \u1ea3nh c\u0169.' : 'Ch\u1ecdn \u1ea3nh t\u1eeb m\u00e1y. \u1ea2nh s\u1ebd \u0111\u01b0\u1ee3c t\u1ea3i l\u00ean khi b\u1ea1n b\u1ea5m t\u1ea1o b\u00e0i \u0111\u0103ng.'}</small>
              <div className='w-full'>
                <label className='w-full border-2 h-[200px] my-4 gap-4 flex flex-col items-center justify-center border-gray-400 border-dashed rounded-md cursor-pointer' htmlFor='file'>
                  <div className='flex flex-col items-center justify-center'>
                    <BsCameraFill color='blue' size={50} />
                    {'Th\u00eam \u1ea3nh'}
                  </div>
                </label>
                <input onChange={handleFiles} hidden type='file' id='file' multiple accept='image/*' />
                <div className='w-full'>
                  <h3 className='font-medium py-4'>{'\u1ea2nh \u0111ang hi\u1ec3n th\u1ecb'}</h3>
                  <div className='flex gap-4 items-center flex-wrap'>
                    {imagesPreview.map((item) => (
                      <div key={item.id} className='relative w-[180px] h-[180px]'>
                        <img src={item.url} alt={item.name} className='w-full h-full object-cover rounded-md' />
                        {item.isLocal && (
                          <span title='X\u00f3a' onClick={() => handleDeleteImage(item.id)} className='absolute top-0 right-0 p-2 cursor-pointer bg-gray-300 hover:bg-gray-400 rounded-full'>
                            <ImBin />
                          </span>
                        )}
                      </div>
                    ))}
                    {imagesPreview.length === 0 && <p className='text-sm text-gray-500'>{'Ch\u01b0a c\u00f3 \u1ea3nh n\u00e0o \u0111\u01b0\u1ee3c ch\u1ecdn.'}</p>}
                  </div>
                </div>
              </div>
            </div>
            <Button onClick={handleSubmit} text={isLoading ? (isEditMode ? '\u0110ang c\u1eadp nh\u1eadt...' : '\u0110ang t\u1ea1o...') : (isEditMode ? 'L\u01b0u c\u1eadp nh\u1eadt' : 'T\u1ea1o m\u1edbi')} bgColor='bg-green-600' />
            <div className='h-[500px]'></div>
          </div>
          <div className='w-[30%] flex-none'>
            <h2 className='font-semibold text-xl py-4'>{'B\u1ea3n \u0111\u1ed3'}</h2>
            <div className='overflow-hidden rounded-md border border-gray-300 bg-white'>
              {mapSrc ? (
                <iframe title='map-preview' src={mapSrc} className='w-full h-[420px]' loading='lazy' />
              ) : (
                <div className='h-[420px] flex items-center justify-center text-sm text-gray-500 px-6 text-center'>{'Nh\u1eadp \u0111\u1ecba ch\u1ec9 \u0111\u1ec3 xem v\u1ecb tr\u00ed hi\u1ec3n th\u1ecb tr\u00ean b\u1ea3n \u0111\u1ed3.'}</div>
              )}
            </div>
          </div>
        </div>
      )}
    </div>
  )
}

export default CreatePost
