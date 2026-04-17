import React, { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import { apiDeletePost, apiGetMyPosts } from '../../services/post'

const formatPrice = (value) => {
  if (value === undefined || value === null || value === '') return '\u0110ang c\u1eadp nh\u1eadt'
  return `${Number(value).toLocaleString('vi-VN')} VN\u0110`
}

const ManagePost = () => {
  const [posts, setPosts] = useState([])
  const [isLoading, setIsLoading] = useState(true)
  const [errorMessage, setErrorMessage] = useState('')

  const loadPosts = async () => {
    setIsLoading(true)
    setErrorMessage('')
    try {
      const response = await apiGetMyPosts()
      if (response?.data?.err === 0) {
        setPosts(response.data.response?.rows || [])
      } else {
        setPosts([])
        setErrorMessage(response?.data?.msg || 'Kh\u00f4ng t\u1ea3i \u0111\u01b0\u1ee3c danh s\u00e1ch b\u00e0i \u0111\u0103ng.')
      }
    } catch (error) {
      setPosts([])
      setErrorMessage(error?.response?.data?.msg || 'Kh\u00f4ng t\u1ea3i \u0111\u01b0\u1ee3c danh s\u00e1ch b\u00e0i \u0111\u0103ng.')
    } finally {
      setIsLoading(false)
    }
  }

  useEffect(() => {
    loadPosts()
  }, [])

  const handleDeletePost = async (postId) => {
    const confirmed = window.confirm('B\u1ea1n c\u00f3 ch\u1eafc mu\u1ed1n x\u00f3a b\u00e0i \u0111\u0103ng n\u00e0y kh\u00f4ng?')
    if (!confirmed) return

    try {
      const response = await apiDeletePost(postId)
      if (response?.data?.err === 0) {
        setPosts((prev) => prev.filter((item) => item.id !== postId))
        return
      }
      window.alert(response?.data?.msg || 'X\u00f3a b\u00e0i \u0111\u0103ng th\u1ea5t b\u1ea1i.')
    } catch (error) {
      window.alert(error?.response?.data?.msg || 'X\u00f3a b\u00e0i \u0111\u0103ng th\u1ea5t b\u1ea1i.')
    }
  }

  if (isLoading) {
    return <div className='text-gray-600'>{'\u0110ang t\u1ea3i danh s\u00e1ch b\u00e0i \u0111\u0103ng...'}</div>
  }

  return (
    <div className='w-full flex flex-col gap-6'>
      <div className='flex items-center justify-between gap-4'>
        <div>
          <h1 className='text-2xl font-bold text-gray-800'>{'Qu\u1ea3n l\u00fd b\u00e0i \u0111\u0103ng'}</h1>
          <p className='text-sm text-gray-500 mt-1'>{'Danh s\u00e1ch b\u00e0i \u0111\u0103ng c\u1ee7a t\u00e0i kho\u1ea3n hi\u1ec7n t\u1ea1i.'}</p>
        </div>
        <Link to='/he-thong/tao-moi-bai-dang' className='px-4 py-2 rounded-md bg-blue-700 text-white font-medium hover:brightness-95'>{'\u0110\u0103ng tin m\u1edbi'}</Link>
      </div>

      {errorMessage && <div className='rounded-md border border-red-200 bg-red-50 p-3 text-red-600'>{errorMessage}</div>}

      {!errorMessage && posts.length === 0 && (
        <div className='rounded-md border border-dashed border-gray-300 p-6 text-gray-500'>{'B\u1ea1n ch\u01b0a c\u00f3 b\u00e0i \u0111\u0103ng n\u00e0o.'}</div>
      )}

      <div className='grid grid-cols-1 gap-4'>
        {posts.map((post) => (
          <div key={post.id} className='rounded-lg border border-gray-200 bg-white p-4 shadow-sm'>
            <div className='flex flex-col gap-4 lg:flex-row lg:items-start lg:justify-between'>
              <div className='flex-1'>
                <h2 className='text-lg font-semibold text-blue-700'>{post.title}</h2>
                <p className='mt-2 text-sm text-gray-600'>{post.address || 'Ch\u01b0a c\u1eadp nh\u1eadt \u0111\u1ecba ch\u1ec9'}</p>
                <div className='mt-3 flex flex-wrap gap-3 text-sm text-gray-700'>
                  <span>{'Gi\u00e1: '}{formatPrice(post?.attributes?.price)}</span>
                  <span>{'Di\u1ec7n t\u00edch: '}{post?.attributes?.acreage || '\u0110ang c\u1eadp nh\u1eadt'}{' m\u00b2'}</span>
                  <span>{'Ng\u00e0y \u0111\u0103ng: '}{post?.attributes?.published || '\u0110ang c\u1eadp nh\u1eadt'}</span>
                </div>
              </div>
              <div className='flex items-center gap-2'>
                <Link to={`/he-thong/chinh-sua-bai-dang/${post.id}`} className='px-3 py-2 rounded-md border border-blue-200 text-blue-600 hover:bg-blue-50'>{'S\u1eeda'}</Link>
                <button type='button' className='px-3 py-2 rounded-md border border-red-200 text-red-600 hover:bg-red-50' onClick={() => handleDeletePost(post.id)}>{'X\u00f3a'}</button>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}

export default ManagePost
