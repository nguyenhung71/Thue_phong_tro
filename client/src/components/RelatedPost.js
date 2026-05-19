import React, { useEffect, useMemo } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import * as actions from '../store/actions'
import { Sitem } from './index'
import { parseImageList } from '../ultils/Common/parseImageList'

const RelatedPost = ({ excludeId }) => {
  const { newPosts } = useSelector((state) => state.post)
  const dispatch = useDispatch()

  const visiblePosts = useMemo(() => {
    if (!excludeId) return newPosts
    return (newPosts || []).filter((item) => item.id !== excludeId)
  }, [excludeId, newPosts])

  useEffect(() => {
    dispatch(actions.getNewPosts())
  }, [dispatch])

  return (
    <div className='w-full bg-white rounded-md p-4'>
      <h3 className='font-semibold text-lg mb-4'>{'Tin m\u1edbi \u0111\u0103ng'}</h3>
      <div className='w-full flex flex-col gap-2'>
        {visiblePosts?.map((item) => (
          <Sitem
            key={item.id}
            id={item.id}
            title={item.title}
            price={item?.attributes?.price}
            createdAt={item.createdAt}
            image={parseImageList(item?.images?.image)}
          />
        ))}
        {visiblePosts?.length === 0 && <p className='text-sm text-gray-500'>Chưa có bài đăng phù hợp.</p>}
      </div>
    </div>
  )
}

export default RelatedPost
