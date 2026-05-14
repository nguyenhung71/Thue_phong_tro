import React, { memo } from 'react'
import { createSearchParams, useLocation, useSearchParams } from 'react-router-dom'

const notActive = 'px-[14px] min-w-[46px] h-[48px] flex justify-center items-center bg-white hover:bg-gray-100 rounded-md shadow-[0_0_5px_rgba(0,0,0,0.1)]'
const active = 'px-[14px] min-w-[46px] h-[48px] flex justify-center items-center bg-[#FF5A3D] text-white hover:opacity-90 rounded-md shadow-[0_0_5px_rgba(0,0,0,0.1)]'

const PageNumber = ({ text, currentPage, icon, setCurrentPage, targetPage }) => {
  const location = useLocation()
  const [searchParams] = useSearchParams()

  const handleChangePage = () => {
    if (text === '...') return
    const nextParams = Object.fromEntries(searchParams.entries())
    const pageToSet = targetPage !== undefined ? targetPage : +text
    nextParams.page = pageToSet
    setCurrentPage(pageToSet)
    window.location.assign(`${location.pathname}?${createSearchParams(nextParams).toString()}`)
  }

  return (
    <div className={String(text) === String(currentPage) && text !== '...' ? `${active} cursor-pointer` : `${notActive} ${text === '...' ? 'cursor-text' : 'cursor-pointer'}`} onClick={handleChangePage}>
      {icon || text}
    </div>
  )
}

export default memo(PageNumber)
