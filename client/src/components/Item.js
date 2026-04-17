import React, { memo, useMemo, useState } from 'react'
import { Link } from 'react-router-dom'
import icons from '../ultils/icons'
import { formatVietnameseToString } from '../ultils/Common/formatVietnameseToString'

const fallbackAvatar = 'https://lnsel.com/wp-content/uploads/2018/12/anon-avatar-300x300.png'
const { BsBookmarkStarFill, GrStar, RiHeartFill, RiHeartLine } = icons

const formatAcreage = (value) => {
  if (value === undefined || value === null || value === '') return ''
  const normalized = String(value).trim()
  if (/m2|m²/i.test(normalized)) return normalized
  return `${normalized} m2`
}

const normalizeImages = (items = []) => items
  .filter(Boolean)
  .map((item) => String(item).trim())
  .filter((item) => /^https?:\/\//i.test(item) && /\.(jpg|jpeg|png|webp|gif)(\?|$)/i.test(item))

const Item = ({ images = [], user, title, star, description, attributes, address = '', id }) => {
  const [isHoverHeart, setIsHoverHeart] = useState(false)
  const detailPath = `/chi-tiet/${formatVietnameseToString(title)}/${id}`
  const zaloLink = user?.zalo || user?.phone ? `https://zalo.me/${user?.zalo || user?.phone}` : ''
  const acreageText = useMemo(() => formatAcreage(attributes?.acreage), [attributes?.acreage])
  const imageList = useMemo(() => normalizeImages(images).slice(0, 4), [images])

  const stars = Array.from({ length: +star || 0 }, (_, index) => <GrStar key={index} className='star-item' size={18} color='yellow' />)
  const addressParts = address.split(',').map((item) => item.trim()).filter(Boolean)
  const shortAddress = addressParts.length >= 2 ? `${addressParts[addressParts.length - 2]}, ${addressParts[addressParts.length - 1]}` : address

  return (
    <div className='w-full flex border-t border-orange-600 py-4 gap-4'>
      <Link to={detailPath} className='w-2/5 relative cursor-pointer'>
        <div className='grid grid-cols-2 gap-[2px]'>
          {imageList.length > 0 && imageList.map((image, index) => (
            <img key={index} src={image} alt='preview' className='w-full h-[120px] object-cover rounded-sm' />
          ))}
          {imageList.length === 0 && <img src={fallbackAvatar} alt='preview' className='w-full h-[120px] object-cover rounded-sm col-span-2' />}
        </div>
        <span className='bg-overlay-70 text-white px-2 rounded-md absolute left-1 bottom-4'>{`${imageList.length} ảnh`}</span>
        <span className='text-white absolute right-5 bottom-1' onMouseEnter={() => setIsHoverHeart(true)} onMouseLeave={() => setIsHoverHeart(false)}>
          {isHoverHeart ? <RiHeartFill size={26} color='red' /> : <RiHeartLine size={26} />}
        </span>
      </Link>
      <div className='w-3/5'>
        <div className='flex justify-between gap-4 w-full'>
          <Link to={detailPath} className='text-red-600 font-medium hover:underline'>
            {stars}
            {title}
          </Link>
          <div className='w-[10%] flex justify-end'>
            <BsBookmarkStarFill size={24} color='orange' />
          </div>
        </div>
        <div className='my-2 flex items-center justify-between gap-2'>
          <span className='font-bold flex-3 text-green-600 whitespace-nowrap overflow-hidden text-ellipsis'>{attributes?.price}</span>
          <span className='flex-1'>{acreageText}</span>
          <span className='flex-3 whitespace-nowrap overflow-hidden text-ellipsis'>{shortAddress}</span>
        </div>
        <Link to={detailPath} className='text-gray-500 w-full h-[50px] text-ellipsis overflow-hidden block hover:text-gray-700'>
          {description}
        </Link>
        <div className='flex items-center my-5 justify-between'>
          <div className='flex items-center gap-2'>
            <img src={user?.avatar || fallbackAvatar} alt='avatar' className='w-[30px] h-[30px] object-cover rounded-full' />
            <p>{user?.name}</p>
          </div>
          <div className='flex items-center gap-1'>
            <a href={user?.phone ? `tel:${user.phone}` : '#'} className='bg-blue-700 text-white p-1 rounded-md'>
              {`Gọi ${user?.phone || ''}`}
            </a>
            <a href={zaloLink || '#'} target='_blank' rel='noreferrer' className='text-blue-700 px-1 rounded-md border border-blue-700'>
              Nhắn Zalo
            </a>
          </div>
        </div>
      </div>
    </div>
  )
}

export default memo(Item)