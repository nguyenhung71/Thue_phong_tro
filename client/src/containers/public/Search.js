import React, { useCallback, useEffect, useMemo, useState } from 'react'
import { createSearchParams, useLocation, useSearchParams } from 'react-router-dom'
import { useSelector } from 'react-redux'
import { Modal, SearchItem } from '../../components'
import icons from '../../ultils/icons'
import { path } from '../../ultils/constant'

const { BsChevronRight, FiSearch, HiOutlineLocationMarker, MdOutlineHouseSiding, RiCrop2Line, TbReportMoney } = icons

const Search = () => {
  const location = useLocation()
  const [searchParams] = useSearchParams()
  const [isShowModal, setIsShowModal] = useState(false)
  const [content, setContent] = useState([])
  const [name, setName] = useState('')
  const { provinces, areas, prices, categories } = useSelector((state) => state.app)
  const [queries, setQueries] = useState({})
  const [arrMinMax, setArrMinMax] = useState({})
  const [defaultText, setDefaultText] = useState('')

  const currentCategoryLabel = useMemo(() => {
    return categories.find((item) => String(item.id) === String(queries.categoryId || '') || item.legacyCode === queries.categoryCode)?.value
  }, [categories, queries.categoryCode, queries.categoryId])

  useEffect(() => {
    const nextQueries = {
      category: searchParams.get('category') || '',
      categoryId: searchParams.get('categoryId') || '',
      categoryCode: searchParams.get('categoryCode') || '',
      province: searchParams.get('province') || '',
      price: searchParams.get('price') || '',
      area: searchParams.get('area') || '',
      priceMin: searchParams.get('priceMin') || '',
      priceMax: searchParams.get('priceMax') || '',
      acreageMin: searchParams.get('acreageMin') || '',
      acreageMax: searchParams.get('acreageMax') || '',
    }
    setQueries((prev) => ({ ...prev, ...nextQueries }))
  }, [searchParams])

  useEffect(() => {
    if (!location.pathname.includes(path.SEARCH)) {
      setArrMinMax({})
    }
  }, [location.pathname])

  const handleShowModal = (nextContent, nextName, nextDefaultText) => {
    setContent(nextContent)
    setName(nextName)
    setDefaultText(nextDefaultText)
    setIsShowModal(true)
  }

  const handleSubmit = useCallback((e, query, nextArrMinMax) => {
    e.stopPropagation()
    setQueries((prev) => ({ ...prev, ...query }))
    setIsShowModal(false)
    if (nextArrMinMax) setArrMinMax((prev) => ({ ...prev, ...nextArrMinMax }))
  }, [])

  const handleSearch = () => {
    const nextParams = {}

    Object.entries(queries).forEach(([key, value]) => {
      if (value !== undefined && value !== null && value !== '') nextParams[key] = value
    })

    nextParams.page = 1
    nextParams.titleSearch = `${currentCategoryLabel || 'Cho thuê tất cả'}${queries.province ? ` tại ${queries.province}` : ''}${queries.price ? ` ${queries.price}` : ''}${queries.area ? ` ${queries.area}` : ''}`.trim()

    window.location.assign(`/${path.SEARCH}?${createSearchParams(nextParams).toString()}`)
  }

  return (
    <>
      <div className='p-[10px] w-4/5 lg:w-3/5 my-3 bg-[#febb02] rounded-lg flex-col lg:flex-row flex items-center justify-around gap-2'>
        <span onClick={() => handleShowModal(categories, 'category', 'Tìm tất cả')} className='cursor-pointer flex-1 w-full'>
          <SearchItem IconBefore={<MdOutlineHouseSiding />} fontWeight IconAfter={<BsChevronRight color='rgb(156, 163, 175)' />} text={currentCategoryLabel} defaultText='Tìm tất cả' />
        </span>
        <span onClick={() => handleShowModal(provinces, 'province', 'Toàn quốc')} className='cursor-pointer flex-1 w-full'>
          <SearchItem IconBefore={<HiOutlineLocationMarker />} IconAfter={<BsChevronRight color='rgb(156, 163, 175)' />} text={queries.province} defaultText='Toàn quốc' />
        </span>
        <span onClick={() => handleShowModal(prices, 'price', 'Chọn giá')} className='cursor-pointer flex-1 w-full'>
          <SearchItem IconBefore={<TbReportMoney />} IconAfter={<BsChevronRight color='rgb(156, 163, 175)' />} text={queries.price} defaultText='Chọn giá' />
        </span>
        <span onClick={() => handleShowModal(areas, 'area', 'Chọn diện tích')} className='cursor-pointer flex-1 w-full'>
          <SearchItem IconBefore={<RiCrop2Line />} IconAfter={<BsChevronRight color='rgb(156, 163, 175)' />} text={queries.area} defaultText='Chọn diện tích' />
        </span>
        <button type='button' onClick={handleSearch} className='outline-none py-2 px-4 flex-1 w-full bg-secondary1 text-[13.3px] flex items-center justify-center gap-2 text-white font-medium rounded-md'>
          <FiSearch />
          Tìm kiếm
        </button>
      </div>
      {isShowModal && <Modal handleSubmit={handleSubmit} queries={queries} arrMinMax={arrMinMax} content={content} name={name} setIsShowModal={setIsShowModal} defaultText={defaultText} />}
    </>
  )
}

export default Search
