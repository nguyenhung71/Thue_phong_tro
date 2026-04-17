import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import * as actions from '../store/actions'
import { Sitem } from './index'

const parseImages = (value) => {
  if (!value) return []
  if (Array.isArray(value)) return value
  if (typeof value !== 'string') return []

  try {
    const parsed = JSON.parse(value)
    return Array.isArray(parsed) ? parsed : []
  } catch {
    return value
      .split(',')
      .map((item) => item.trim())
      .filter((item) => /^https?:\/\//i.test(item) && /\.(jpg|jpeg|png|webp|gif)(\?|$)/i.test(item))
  }
}

const RelatedPost = () => {
  const { newPosts } = useSelector((state) => state.post)
  const dispatch = useDispatch()

  useEffect(() => {
    dispatch(actions.getNewPosts())
  }, [dispatch])

  return (
    <div className='w-full bg-white rounded-md p-4'>
      <h3 className='font-semibold text-lg mb-4'>{'Tin m\u1edbi \u0111\u0103ng'}</h3>
      <div className='w-full flex flex-col gap-2'>
        {newPosts?.map((item) => (
          <Sitem
            key={item.id}
            title={item.title}
            price={item?.attributes?.price}
            createdAt={item.createdAt}
            image={parseImages(item?.images?.image)}
          />
        ))}
      </div>
    </div>
  )
}

export default RelatedPost
