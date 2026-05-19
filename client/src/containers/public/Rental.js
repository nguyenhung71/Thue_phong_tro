import React, { useEffect, useMemo, useState } from 'react'
import { useLocation } from 'react-router-dom'
import { useSelector } from 'react-redux'
import { ItemSidebar, Province, RelatedPost } from '../../components'
import { List, Pagination } from './index'

const Rental = () => {
  const { prices, areas, categories } = useSelector((state) => state.app)
  const [categoryCurrent, setCategoryCurrent] = useState({})
  const location = useLocation()

  useEffect(() => {
    const category = categories?.find((item) => `/${item.routePath || item.code}` === location.pathname)
    setCategoryCurrent(category || {})
  }, [categories, location.pathname])

  const title = useMemo(() => categoryCurrent?.header || categoryCurrent?.value || 'Danh sách cho thuê', [categoryCurrent])
  const description = useMemo(() => categoryCurrent?.subheader || 'Danh sách bài đăng theo chuyên mục đã chọn.', [categoryCurrent])

  return (
    <div className='w-full flex flex-col gap-3'>
      <div>
        <h1 className='text-[28px] font-bold'>{title}</h1>
        <p className='text-base text-gray-700'>{description}</p>
      </div>
      <Province />
      <div className='w-full flex gap-4'>
        <div className='w-[70%]'>
          <List categoryId={categoryCurrent?.id} categoryCode={categoryCurrent?.legacyCode} />
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

export default Rental
