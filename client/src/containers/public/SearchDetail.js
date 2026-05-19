import React, { useMemo } from 'react'
import { useLocation, useSearchParams } from 'react-router-dom'
import { useSelector } from 'react-redux'
import { ItemSidebar, RelatedPost } from '../../components'
import { List, Pagination } from './index'

const SearchDetail = () => {
  const { prices, areas } = useSelector((state) => state.app)
  const location = useLocation()
  const [searchParams] = useSearchParams()

  const titleSearch = useMemo(
    () => searchParams.get('titleSearch') || location.state?.titleSearch || 'Kết quả tìm kiếm',
    [location.state?.titleSearch, searchParams]
  )

  return (
    <div className='w-full flex flex-col gap-3'>
      <div>
        <h1 className='text-[28px] font-bold'>{titleSearch}</h1>
        <p className='text-base text-gray-700'>{`${titleSearch || 'Danh sách bài đăng'} phù hợp với điều kiện tìm kiếm hiện tại.`}</p>
      </div>
      <div className='w-full flex gap-4'>
        <div className='w-[70%]'>
          <List />
          <Pagination />
        </div>
        <div className='w-[30%] flex flex-col gap-4 justify-start items-center'>
          <ItemSidebar isDouble={true} type='priceCode' content={prices} title='Xem theo giá' />
          <ItemSidebar isDouble={true} type='areaCode' content={areas} title='Xem theo diện tích' />
          <RelatedPost />
        </div>
      </div>
    </div>
  )
}

export default SearchDetail
