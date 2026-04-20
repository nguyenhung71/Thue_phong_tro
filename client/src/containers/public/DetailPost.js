import React, { useEffect, useMemo, useState } from 'react'
import { useLocation, useParams } from 'react-router-dom'
import { useSelector } from 'react-redux'
import { ItemSidebar, RelatedPost } from '../../components'
import { apiGetPostById } from '../../services'
import icons from '../../ultils/icons'
import { parseImageList } from '../../ultils/Common/parseImageList'

const fallbackAvatar = 'https://lnsel.com/wp-content/uploads/2018/12/anon-avatar-300x300.png'
const { HiOutlineLocationMarker, TbReportMoney, RiCrop2Line, MdOutlineHouseSiding } = icons

const parseDateValue = (value) => {
  if (!value) return null
  if (value instanceof Date && !Number.isNaN(value.getTime())) return value

  const normalized = String(value).trim()
  const ddmmyyyy = normalized.match(/^(\d{1,2})\/(\d{1,2})\/(\d{4})$/)
  if (ddmmyyyy) {
    const [, day, month, year] = ddmmyyyy
    return new Date(Number(year), Number(month) - 1, Number(day))
  }

  const parsed = new Date(normalized)
  return Number.isNaN(parsed.getTime()) ? null : parsed
}

const formatDate = (value) => {
  if (!value) return 'Đang cập nhật'
  const parsed = parseDateValue(value)
  if (!parsed) return String(value)
  return new Intl.DateTimeFormat('vi-VN').format(parsed)
}

const formatPrice = (value) => {
  if (value === undefined || value === null || value === '') return 'Thỏa thuận'

  const normalized = String(value).trim()
  if (/^\d+(\.\d+)?$/.test(normalized)) {
    return `${new Intl.NumberFormat('vi-VN').format(Number(normalized))} đ/tháng`
  }

  return normalized
}

const formatAcreage = (value) => {
  if (value === undefined || value === null || value === '') return 'Đang cập nhật'

  const normalized = String(value).trim()
  return /m2|m²/i.test(normalized) ? normalized : `${normalized} m2`
}

const parseDescriptionSections = (value) => {
  if (!value) return []
  if (Array.isArray(value)) return value.map((item) => String(item).trim()).filter(Boolean)
  if (typeof value !== 'string') return [String(value)]

  try {
    const parsed = JSON.parse(value)
    if (Array.isArray(parsed)) return parsed.map((item) => String(item).trim()).filter(Boolean)
    if (typeof parsed === 'string') {
      return parsed.split('\n').map((item) => item.trim()).filter(Boolean)
    }
  } catch {
  }

  const sections = value.split('\n').map((item) => item.trim()).filter(Boolean)
  return sections.length > 0 ? sections : [value.trim()]
}

const buildCategoryPath = (postCategory, categories) => {
  if (!postCategory) return ''

  const matchedCategory = categories?.find((item) =>
    String(item.id) === String(postCategory.id) ||
    String(item.legacyCode) === String(postCategory.code) ||
    String(item.routePath) === String(postCategory.code)
  )

  return matchedCategory?.routePath ? `/${matchedCategory.routePath}` : ''
}

const DetailPost = () => {
  const { prices, areas, categories } = useSelector((state) => state.app)
  const { isLoggedIn } = useSelector((state) => state.auth)
  const location = useLocation()
  const { postId } = useParams()
  const [post, setPost] = useState(null)
  const [isLoading, setIsLoading] = useState(true)
  const [errorMessage, setErrorMessage] = useState('')
  const [activeImage, setActiveImage] = useState('')
  const [failedImages, setFailedImages] = useState([])

  const resolvedPostId = useMemo(() => {
    if (postId) return postId
    const segments = location.pathname.split('/').filter(Boolean)
    return segments[segments.length - 1] || ''
  }, [location.pathname, postId])

  const allImages = useMemo(() => parseImageList(post?.images?.image), [post?.images?.image])
  const imageList = useMemo(
    () => allImages.filter((item) => !failedImages.includes(item)),
    [allImages, failedImages]
  )

  const descriptionSections = useMemo(() => parseDescriptionSections(post?.description), [post?.description])
  const categoryPath = useMemo(() => buildCategoryPath(post?.category, categories), [categories, post?.category])
  const mapSrc = useMemo(() => {
    if (!post?.address) return ''
    return `https://www.google.com/maps?q=${encodeURIComponent(post.address)}&output=embed`
  }, [post?.address])

  const infoItems = useMemo(() => ([
    { label: 'Mã tin', value: post?.overview?.code || 'Đang cập nhật' },
    { label: 'Loại tin', value: post?.overview?.bonus || 'Tin thường' },
    { label: 'Ngày đăng', value: formatDate(post?.attributes?.published || post?.overview?.created) },
    { label: 'Hết hạn', value: formatDate(post?.overview?.expire) },
  ]), [post])

  const zaloTarget = post?.user?.zalo || post?.user?.phone || ''

  useEffect(() => {
    window.scrollTo(0, 0)
  }, [resolvedPostId])

  useEffect(() => {
    setFailedImages([])
  }, [post?.id])

  useEffect(() => {
    setActiveImage((prev) => {
      if (prev && imageList.includes(prev)) return prev
      return imageList[0] || ''
    })
  }, [imageList])

  const handleImageError = (imageUrl) => {
    setFailedImages((prev) => (prev.includes(imageUrl) ? prev : [...prev, imageUrl]))
  }

  useEffect(() => {
    let isMounted = true

    const fetchPostDetail = async () => {
      if (!isLoggedIn) {
        if (isMounted) setIsLoading(false)
        return
      }

      if (!resolvedPostId) {
        setErrorMessage('Liên kết bài đăng không hợp lệ.')
        setIsLoading(false)
        return
      }

      setIsLoading(true)
      setErrorMessage('')

      try {
        const response = await apiGetPostById(resolvedPostId)
        const nextPost = response?.data?.response

        if (!isMounted) return

        if (response?.data?.err !== 0 || !nextPost) {
          setPost(null)
          setErrorMessage(response?.data?.msg || 'Không tìm thấy bài đăng.')
          return
        }

        setPost(nextPost)
      } catch (error) {
        if (!isMounted) return
        setPost(null)
        setErrorMessage(error?.response?.data?.msg || 'Không thể tải chi tiết bài đăng.')
      } finally {
        if (isMounted) setIsLoading(false)
      }
    }

    fetchPostDetail()

    return () => {
      isMounted = false
    }
  }, [isLoggedIn, resolvedPostId])

  if (!isLoggedIn) {
    return (
      <div className='w-full rounded-md bg-white p-6 shadow-md'>
        <h1 className='text-2xl font-semibold text-gray-900'>Cần đăng nhập để xem chi tiết bài đăng</h1>
        <p className='mt-3 text-gray-600'>Bạn cần đăng nhập bằng tài khoản có trong hệ thống để xem thông tin chi tiết của bài đăng này.</p>
        <div className='mt-5 flex flex-wrap gap-3'>
          <a href='/login' className='inline-flex rounded-md bg-blue-700 px-4 py-2 text-sm font-medium text-white hover:bg-blue-800'>
            Đăng nhập
          </a>
          <a href='/' className='inline-flex rounded-md border border-gray-300 px-4 py-2 text-sm font-medium text-gray-700 hover:bg-gray-50'>
            Quay về trang chủ
          </a>
        </div>
      </div>
    )
  }

  if (isLoading) {
    return (
      <div className='w-full rounded-md bg-white p-6 shadow-md'>
        <p className='text-gray-600'>Đang tải thông tin bài đăng...</p>
      </div>
    )
  }

  if (errorMessage || !post) {
    return (
      <div className='w-full rounded-md bg-white p-6 shadow-md'>
        <h1 className='text-2xl font-semibold text-gray-900'>Không thể hiển thị bài đăng</h1>
        <p className='mt-3 text-gray-600'>{errorMessage || 'Không tìm thấy dữ liệu bài đăng.'}</p>
        <a href='/' className='mt-5 inline-flex rounded-md bg-blue-700 px-4 py-2 text-sm font-medium text-white hover:bg-blue-800'>
          Quay về trang chủ
        </a>
      </div>
    )
  }

  return (
    <div className='w-full flex flex-col gap-4'>
      <div className='flex flex-wrap items-center gap-2 text-sm text-gray-500'>
        <a href='/' className='hover:text-blue-700'>Trang chủ</a>
        <span>/</span>
        {categoryPath
          ? <a href={categoryPath} className='hover:text-blue-700'>{post?.category?.value || 'Danh mục'}</a>
          : <span>{post?.category?.value || 'Danh mục'}</span>}
        <span>/</span>
        <span className='text-gray-700'>{post?.title}</span>
      </div>

      <div className='flex flex-col gap-4 lg:flex-row'>
        <div className='w-full lg:w-[70%] flex flex-col gap-4'>
          <div className='overflow-hidden rounded-md bg-white shadow-md'>
            <div className='border-b border-gray-200 p-4 md:p-6'>
              <div className='flex flex-wrap items-center gap-2'>
                <span className='rounded-full bg-orange-100 px-3 py-1 text-xs font-semibold uppercase tracking-wide text-orange-700'>
                  {post?.category?.value || 'Bài đăng cho thuê'}
                </span>
                <span className='rounded-full bg-blue-50 px-3 py-1 text-xs font-medium text-blue-700'>
                  {post?.overview?.bonus || 'Tin thường'}
                </span>
              </div>
              <h1 className='mt-3 text-2xl font-bold leading-tight text-gray-900 md:text-3xl'>{post?.title}</h1>
              <p className='mt-3 flex items-start gap-2 text-gray-600'>
                <HiOutlineLocationMarker className='mt-1 flex-none text-orange-600' size={18} />
                <span>{post?.address || 'Đang cập nhật địa chỉ'}</span>
              </p>
              <div className='mt-5 grid gap-3 sm:grid-cols-3'>
                <div className='rounded-xl border border-emerald-100 bg-emerald-50 p-4'>
                  <div className='flex items-center gap-2 text-sm text-emerald-700'>
                    <TbReportMoney size={18} />
                    <span>Giá cho thuê</span>
                  </div>
                  <p className='mt-2 text-lg font-semibold text-emerald-800'>{formatPrice(post?.attributes?.price)}</p>
                </div>
                <div className='rounded-xl border border-sky-100 bg-sky-50 p-4'>
                  <div className='flex items-center gap-2 text-sm text-sky-700'>
                    <RiCrop2Line size={18} />
                    <span>Diện tích</span>
                  </div>
                  <p className='mt-2 text-lg font-semibold text-sky-800'>{formatAcreage(post?.attributes?.acreage)}</p>
                </div>
                <div className='rounded-xl border border-amber-100 bg-amber-50 p-4'>
                  <div className='flex items-center gap-2 text-sm text-amber-700'>
                    <MdOutlineHouseSiding size={18} />
                    <span>Đối tượng</span>
                  </div>
                  <p className='mt-2 text-lg font-semibold text-amber-800'>{post?.overview?.target || 'Tất cả'}</p>
                </div>
              </div>
            </div>

            <div className='p-4 md:p-6'>
              <div className='overflow-hidden rounded-2xl border border-gray-100 bg-gray-50'>
                {imageList.length > 0
                  ? (
                    <img
                      src={activeImage || imageList[0]}
                      alt='Ảnh bài đăng'
                      className='h-[280px] w-full object-cover md:h-[460px]'
                      onError={() => handleImageError(activeImage || imageList[0])}
                    />
                  )
                  : (
                    <div className='flex h-[280px] w-full items-center justify-center bg-gray-100 text-sm text-gray-500 md:h-[460px]'>
                      Bài đăng này chưa có ảnh
                    </div>
                  )}
              </div>
              {imageList.length > 1 && (
                <div className='mt-4 grid grid-cols-4 gap-3 md:grid-cols-5'>
                  {imageList.map((image, index) => (
                    <button
                      key={`${image}-${index}`}
                      type='button'
                      onClick={() => setActiveImage(image)}
                      className={`overflow-hidden rounded-xl border ${activeImage === image ? 'border-blue-600 ring-2 ring-blue-100' : 'border-gray-200'} transition`}
                    >
                      <img
                        src={image}
                        alt={`Ảnh bài đăng ${index + 1}`}
                        className='h-20 w-full object-cover md:h-24'
                        onError={() => handleImageError(image)}
                      />
                    </button>
                  ))}
                </div>
              )}
            </div>
          </div>

          <div className='rounded-md bg-white p-4 shadow-md md:p-6'>
            <h2 className='text-xl font-semibold text-gray-900'>Thông tin chi tiết</h2>
            {post?.category?.subheader && <p className='mt-2 text-gray-600'>{post.category.subheader}</p>}

            <div className='mt-5 grid gap-3 md:grid-cols-2'>
              {infoItems.map((item) => (
                <div key={item.label} className='rounded-xl border border-gray-200 bg-gray-50 p-4'>
                  <p className='text-sm text-gray-500'>{item.label}</p>
                  <p className='mt-2 font-medium text-gray-900'>{item.value}</p>
                </div>
              ))}
            </div>

            <div className='mt-6'>
              <h3 className='text-lg font-semibold text-gray-900'>Mô tả</h3>
              <div className='mt-3 space-y-3 text-gray-700 leading-7'>
                {descriptionSections.length > 0
                  ? descriptionSections.map((section, index) => (
                    <p key={`${section}-${index}`}>{section}</p>
                  ))
                  : <p>Chưa có mô tả chi tiết cho bài đăng này.</p>}
              </div>
            </div>
          </div>

          <div className='rounded-md bg-white p-4 shadow-md md:p-6'>
            <h2 className='text-xl font-semibold text-gray-900'>Bản đồ</h2>
            <div className='mt-4 overflow-hidden rounded-2xl border border-gray-200 bg-white'>
              {mapSrc
                ? <iframe title='post-map' src={mapSrc} className='h-[360px] w-full md:h-[420px]' loading='lazy' />
                : (
                  <div className='flex h-[360px] items-center justify-center px-6 text-center text-sm text-gray-500 md:h-[420px]'>
                    Chưa có địa chỉ để hiển thị bản đồ.
                  </div>
                )}
            </div>
          </div>
        </div>

        <div className='w-full lg:w-[30%] flex flex-col gap-4'>
          <div className='rounded-md bg-white p-4 shadow-md'>
            <div className='flex items-center gap-3'>
              <img src={post?.user?.avatar || fallbackAvatar} alt={post?.user?.name || 'avatar'} className='h-16 w-16 rounded-full object-cover' />
              <div>
                <p className='text-sm text-gray-500'>Người đăng tin</p>
                <h2 className='text-lg font-semibold text-gray-900'>{post?.user?.name || 'Chủ bài đăng'}</h2>
              </div>
            </div>

            <div className='mt-4 rounded-xl bg-gray-50 p-4 text-sm text-gray-700'>
              <p><span className='font-medium text-gray-900'>Điện thoại:</span> {post?.user?.phone || 'Đang cập nhật'}</p>
              <p className='mt-2'><span className='font-medium text-gray-900'>Email:</span> {post?.user?.email || 'Đang cập nhật'}</p>
              <p className='mt-2'><span className='font-medium text-gray-900'>Zalo:</span> {post?.user?.zalo || post?.user?.phone || 'Đang cập nhật'}</p>
            </div>

            <div className='mt-4 flex flex-col gap-3'>
              <a
                href={post?.user?.phone ? `tel:${post.user.phone}` : '#'}
                className={`inline-flex items-center justify-center rounded-md px-4 py-3 text-sm font-semibold text-white ${post?.user?.phone ? 'bg-green-600 hover:bg-green-700' : 'cursor-not-allowed bg-gray-300'}`}
              >
                {post?.user?.phone ? `Gọi ${post.user.phone}` : 'Chưa có số điện thoại'}
              </a>
              <a
                href={zaloTarget ? `https://zalo.me/${zaloTarget}` : '#'}
                target='_blank'
                rel='noreferrer'
                className={`inline-flex items-center justify-center rounded-md border px-4 py-3 text-sm font-semibold ${zaloTarget ? 'border-blue-600 text-blue-700 hover:bg-blue-50' : 'cursor-not-allowed border-gray-300 text-gray-400'}`}
              >
                Nhắn Zalo
              </a>
            </div>
          </div>

          <ItemSidebar content={categories} title='Danh mục cho thuê' />
          <ItemSidebar isDouble={true} type='priceCode' content={prices} title='Xem theo giá' />
          <ItemSidebar isDouble={true} type='areaCode' content={areas} title='Xem theo diện tích' />
          <RelatedPost excludeId={post?.id} />
        </div>
      </div>
    </div>
  )
}

export default DetailPost
