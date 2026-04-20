import React, { memo, useEffect, useMemo, useState } from 'react'
import moment from 'moment'
import 'moment/locale/vi'
import { formatVietnameseToString } from '../ultils/Common/formatVietnameseToString'
import { parseImageList } from '../ultils/Common/parseImageList'

const Sitem = ({ id, title, price, image = [], createdAt }) => {
  const [failedImages, setFailedImages] = useState([])

  const formatTime = (value) => moment(value).fromNow()
  const detailPath = id ? `/chi-tiet/${formatVietnameseToString(title || 'bai-dang')}/${id}` : '#'
  const shortTitle = title?.length > 45 ? `${title.slice(0, 45)}...` : title
  const imageList = useMemo(
    () => parseImageList(image).filter((item) => !failedImages.includes(item)),
    [failedImages, image]
  )

  useEffect(() => {
    setFailedImages([])
  }, [image])

  const handleImageError = (imageUrl) => {
    setFailedImages((prev) => (prev.includes(imageUrl) ? prev : [...prev, imageUrl]))
  }

  return (
    <a href={detailPath} className='w-full flex items-center gap-2 py-2 border-b border-gray-300 hover:bg-gray-50 transition'>
      {imageList[0]
        ? (
          <img
            src={imageList[0]}
            alt='Ảnh bài đăng'
            className='w-[65px] h-[65px] object-cover flex-none rounded-md'
            onError={() => handleImageError(imageList[0])}
          />
        )
        : (
          <div className='w-[65px] h-[65px] flex-none rounded-md bg-gray-100 flex items-center justify-center text-xs text-gray-500 text-center px-2'>
            Chưa có ảnh
          </div>
        )}
      <div className='w-full flex-auto flex flex-col justify-between gap-1'>
        <h4 className='text-blue-600 text-[14px] hover:underline'>{shortTitle}</h4>
        <div className='flex items-center justify-between w-full gap-2'>
          <span className='text-sm font-medium text-green-500'>{price}</span>
          <span className='text-sm text-gray-300 whitespace-nowrap'>{formatTime(createdAt)}</span>
        </div>
      </div>
    </a>
  )
}

export default memo(Sitem)
