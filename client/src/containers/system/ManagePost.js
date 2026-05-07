import React, { useEffect, useState } from 'react'
import { useSelector } from 'react-redux'
import { toast } from 'react-toastify'
import { apiDeletePost, apiGetMyPosts, apiGetPosts } from '../../services/post'
import { formatVietnameseToString } from '../../ultils/Common/formatVietnameseToString'

const ManagePost = () => {
  const [posts, setPosts] = useState([])
  const [isLoading, setIsLoading] = useState(true)
  const [errorMessage, setErrorMessage] = useState('')
  const { roleId } = useSelector((state) => state.auth)
  const isAdmin = roleId === 'ADMIN'

  const loadPosts = async () => {
    setIsLoading(true)
    setErrorMessage('')
    try {
      const response = isAdmin ? await apiGetPosts() : await apiGetMyPosts()
      if (response?.data?.err === 0) {
        setPosts(response.data.response?.rows || response.data.response || [])
      } else {
        setPosts([])
        setErrorMessage(response?.data?.msg || 'Không tải được danh sách bài đăng.')
      }
    } catch (error) {
      setPosts([])
      setErrorMessage(error?.response?.data?.msg || 'Không tải được danh sách bài đăng.')
    } finally {
      setIsLoading(false)
    }
  }

  useEffect(() => {
    loadPosts()
  }, [isAdmin])

  const getDetailPath = (post) => `/chi-tiet/${formatVietnameseToString(post?.title || 'bai-dang')}/${post?.id}`

  const handleDeletePost = async (postId) => {
    const confirmed = window.confirm('Bạn có chắc muốn xóa bài đăng này không?')
    if (!confirmed) return

    try {
      const response = await apiDeletePost(postId)
      if (response?.data?.err === 0) {
        setPosts((prev) => prev.filter((item) => item.id !== postId))
        toast.success('Xóa bài đăng thành công.')
        return
      }
      toast.error(response?.data?.msg || 'Xóa bài đăng thất bại.')
    } catch (error) {
      toast.error(error?.response?.data?.msg || 'Xóa bài đăng thất bại.')
    }
  }

  if (isLoading) {
    return <div className='text-gray-600'>Đang tải danh sách bài đăng...</div>
  }

  return (
    <div className='w-full flex flex-col gap-6'>
      <div className='flex items-center justify-between gap-4'>
        <div>
          <h1 className='text-2xl font-bold text-gray-800'>Quản lý bài đăng</h1>
          <p className='text-sm text-gray-500 mt-1'>
            {isAdmin ? 'Danh sách toàn bộ bài đăng trong hệ thống.' : 'Danh sách bài đăng của tài khoản hiện tại.'}
          </p>
        </div>
        {!isAdmin && (
          <a href='/he-thong/tao-moi-bai-dang' className='px-4 py-2 rounded-md bg-blue-700 text-white font-medium hover:brightness-95'>
            Đăng tin mới
          </a>
        )}
      </div>

      {errorMessage && <div className='rounded-md border border-red-200 bg-red-50 p-3 text-red-600'>{errorMessage}</div>}

      {!errorMessage && posts.length === 0 && (
        <div className='rounded-md border border-dashed border-gray-300 p-6 text-gray-500'>
          {isAdmin ? 'Hiện chưa có bài đăng nào trong hệ thống.' : 'Bạn chưa có bài đăng nào.'}
        </div>
      )}

      <div className='grid grid-cols-1 gap-4'>
        {posts.map((post) => (
          <div key={post.id} className='rounded-lg border border-gray-200 bg-white p-4 shadow-sm hover:shadow-md transition'>
            <div className='flex flex-col gap-4 lg:flex-row lg:items-start lg:justify-between'>
              <div className='flex-1'>
                <a href={getDetailPath(post)} className='text-lg font-semibold text-blue-700 hover:underline'>
                  {post.title}
                </a>
                <div className='mt-3 flex flex-wrap gap-3 text-sm text-gray-700'>
                  <span>Tên bài đăng: <a href={getDetailPath(post)} className='text-blue-700 hover:underline'>{post.title || 'Chưa cập nhật'}</a></span>
                  <span>Ngày đăng: {post?.attributes?.published || 'Chưa cập nhật'}</span>
                  <span>Người đăng: {post?.user?.name || 'Chưa cập nhật'}</span>
                </div>
                {!isAdmin && (
                  <>
                    <p className='mt-2 text-sm text-gray-600'>{post.address || 'Chưa cập nhật địa chỉ'}</p>
                    <div className='mt-3 flex flex-wrap gap-3 text-sm text-gray-700'>
                      <span>Giá: {post?.attributes?.price ? `${Number(post.attributes.price).toLocaleString('vi-VN')} VNĐ` : 'Đang cập nhật'}</span>
                      <span>Diện tích: {post?.attributes?.acreage || 'Đang cập nhật'} m²</span>
                    </div>
                  </>
                )}
              </div>
              <div className='flex items-center gap-2'>
                <a href={getDetailPath(post)} className='px-3 py-2 rounded-md border border-slate-200 text-slate-700 hover:bg-slate-50'>
                  Xem chi tiết
                </a>
                {!isAdmin && (
                  <a href={`/he-thong/chinh-sua-bai-dang/${post.id}`} className='px-3 py-2 rounded-md border border-blue-200 text-blue-600 hover:bg-blue-50'>
                    Sửa
                  </a>
                )}
                <button type='button' className='px-3 py-2 rounded-md border border-red-200 text-red-600 hover:bg-red-50' onClick={() => handleDeletePost(post.id)}>
                  Xóa
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}

export default ManagePost
