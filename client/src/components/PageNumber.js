import React, { memo } from 'react'
import { createSearchParams, useLocation, useSearchParams } from 'react-router-dom'

const notActive = 'w-[46px] h-[48px] flex justify-center items-center bg-white hover:bg-gray-300 rounded-md'
const active = 'w-[46px] h-[48px] flex justify-center items-center bg-[#E13427] text-white hover:opacity-90 rounded-md'

const PageNumber = ({ text, currentPage, icon, setCurrentPage }) => {
  const location = useLocation()
  const [searchParams] = useSearchParams()

  const handleChangePage = () => {
    if (text === '...') return
    const nextParams = Object.fromEntries(searchParams.entries())
    nextParams.page = +text
    setCurrentPage(+text)
    window.location.assign(`${location.pathname}?${createSearchParams(nextParams).toString()}`)
  }

  return (
    <div className={+text === +currentPage ? `${active} ${text === '...' ? 'cursor-text' : 'cursor-pointer'}` : `${notActive} ${text === '...' ? 'cursor-text' : 'cursor-pointer'}`} onClick={handleChangePage}>
      {icon || text}
    </div>
  )
}

export default memo(PageNumber)
