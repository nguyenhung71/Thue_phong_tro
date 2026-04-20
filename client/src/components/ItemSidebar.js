import React, { memo } from 'react'
import { createSearchParams, useLocation, useSearchParams } from 'react-router-dom'
import icons from '../ultils/icons'

const { GrNext } = icons

const ItemSidebar = ({ title, content = [], isDouble, type }) => {
  const location = useLocation()
  const [searchParams] = useSearchParams()

  const pairs = []
  for (let index = 0; index < content.length; index += 2) {
    pairs.push({ left: content[index], right: content[index + 1] || null })
  }

  const buildRangeParams = (item) => {
    if (!item) return {}
    const isPrice = type === 'priceCode'
    const minKey = isPrice ? 'priceMin' : 'acreageMin'
    const maxKey = isPrice ? 'priceMax' : 'acreageMax'
    const codeKey = isPrice ? 'priceCode' : 'areaCode'

    return {
      [minKey]: item.min ?? 0,
      [maxKey]: item.max ?? '',
      [codeKey]: item.code,
      [isPrice ? 'price' : 'area']: item.value,
    }
  }

  const handleFilterPosts = (item) => {
    if (!item) return
    const nextParams = Object.fromEntries(searchParams.entries())
    const mappedRange = buildRangeParams(item)

    Object.entries(mappedRange).forEach(([key, value]) => {
      if (value === '' || value === null || value === undefined) delete nextParams[key]
      else nextParams[key] = value
    })
    nextParams.page = 1

    window.location.assign(`${location.pathname}?${createSearchParams(nextParams).toString()}`)
  }

  return (
    <div className='p-4 rounded-md bg-white w-full'>
      <h3 className='text-lg font-semibold mb-4'>{title}</h3>
      {!isDouble && (
        <div className='flex flex-col gap-2'>
          {content.map((item) => (
            <a
              href={`/${item.routePath || item.code}`}
              key={item.id || item.code}
              className='flex gap-2 items-center cursor-pointer hover:text-orange-600 border-b border-gray-200 pb-1 border-dashed'
            >
              <GrNext size={10} color='#ccc' />
              <p>{item.value}</p>
            </a>
          ))}
        </div>
      )}
      {isDouble && (
        <div className='flex flex-col gap-2'>
          {pairs.map((item, index) => (
            <div key={index} className='flex items-center justify-around gap-4'>
              {item.left && (
                <div onClick={() => handleFilterPosts(item.left)} className='flex flex-1 gap-2 items-center cursor-pointer hover:text-orange-600 border-b border-gray-200 pb-1 border-dashed'>
                  <GrNext size={10} color='#ccc' />
                  <p>{item.left.value}</p>
                </div>
              )}
              {item.right && (
                <div onClick={() => handleFilterPosts(item.right)} className='flex flex-1 gap-2 items-center cursor-pointer hover:text-orange-600 border-b border-gray-200 pb-1 border-dashed'>
                  <GrNext size={10} color='#ccc' />
                  <p>{item.right.value}</p>
                </div>
              )}
              {!item.right && <div className='flex-1' />}
            </div>
          ))}
        </div>
      )}
    </div>
  )
}

export default memo(ItemSidebar)
