import React, { useEffect, useMemo } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { createSearchParams, useLocation, useSearchParams } from 'react-router-dom'
import { Button, Item } from '../../components'
import { getPostsLimit } from '../../store/actions/post'

const parseDescription = (value) => {
  if (!value) return ''
  if (Array.isArray(value)) return value.join(' ')
  if (typeof value !== 'string') return String(value)
  try {
    const parsed = JSON.parse(value)
    return Array.isArray(parsed) ? parsed.join(' ') : parsed
  } catch {
    return value
  }
}

const List = ({ categoryId, categoryCode }) => {
  const dispatch = useDispatch()
  const location = useLocation()
  const [searchParams] = useSearchParams()
  const { posts } = useSelector((state) => state.post)

  const currentSort = searchParams.get('sort') || 'default'
  const queryObject = useMemo(() => {
    const nextQuery = Object.fromEntries(searchParams.entries())
    if (categoryId && categoryId !== 'none') nextQuery.categoryId = categoryId
    if (categoryCode && categoryCode !== 'none') nextQuery.categoryCode = categoryCode
    return nextQuery
  }, [categoryCode, categoryId, searchParams])

  useEffect(() => {
    dispatch(getPostsLimit(queryObject))
  }, [dispatch, queryObject])

  const handleSort = (sort) => {
    const nextParams = { ...queryObject, sort, page: 1 }
    window.location.assign(`${location.pathname}?${createSearchParams(nextParams).toString()}`)
  }

  return (
    <div className='w-full p-2 bg-white shadow-md rounded-md px-6'>
      <div className='flex items-center justify-between my-3'>
        <h4 className='text-xl font-semibold'>Danh sách tin đăng</h4>
        <span>{currentSort === 'newest' ? 'Cập nhật: mới nhất' : 'Cập nhật: mặc định'}</span>
      </div>
      <div className='flex items-center gap-2 my-2'>
        <span>Sắp xếp:</span>
        <Button bgColor={currentSort === 'default' ? 'bg-orange-500' : 'bg-gray-200'} textColor={currentSort === 'default' ? 'text-white' : 'text-gray-700'} text='Mặc định' onClick={() => handleSort('default')} />
        <Button bgColor={currentSort === 'newest' ? 'bg-orange-500' : 'bg-gray-200'} textColor={currentSort === 'newest' ? 'text-white' : 'text-gray-700'} text='Mới nhất' onClick={() => handleSort('newest')} />
      </div>
      <div className='items'>
        {posts?.length > 0 && posts.map((item) => (
          <Item key={item?.id} address={item?.address} attributes={item?.attributes} description={parseDescription(item?.description)} images={item?.images?.image} star={+item?.star} title={item?.title} user={item?.user} id={item?.id} />
        ))}
        {(!posts || posts.length === 0) && <p className='py-8 text-gray-500'>Chưa có bài đăng phù hợp.</p>}
      </div>
    </div>
  )
}

export default List
