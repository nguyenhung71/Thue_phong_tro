import React, { useEffect, useState } from 'react'
import { useSearchParams } from 'react-router-dom'
import { useSelector } from 'react-redux'
import { PageNumber } from '../../components'
import icons from '../../ultils/icons'

const { GrLinkNext } = icons

const Pagination = () => {
  const { count, posts } = useSelector((state) => state.post)
  const [arrPage, setArrPage] = useState([])
  const [currentPage, setCurrentPage] = useState(1)
  const [isHideEnd, setIsHideEnd] = useState(false)
  const [isHideStart, setIsHideStart] = useState(false)
  const [searchParams] = useSearchParams()

  useEffect(() => {
    const page = searchParams.get('page')
    if (page && +page !== currentPage) setCurrentPage(+page)
    if (!page) setCurrentPage(1)
  }, [currentPage, searchParams])

  useEffect(() => {
    const itemsPerPage = Number(process.env.REACT_APP_LIMIT_POSTS) || posts?.length || 1
    const maxPage = Math.max(1, Math.ceil(count / itemsPerPage))
    const end = currentPage + 2 > maxPage ? maxPage : currentPage + 2
    const start = currentPage - 2 <= 1 ? 1 : currentPage - 2
    const temp = []

    for (let index = start; index <= end; index += 1) temp.push(index)

    setArrPage(temp)
    setIsHideEnd(currentPage >= maxPage - 2)
    setIsHideStart(currentPage <= 3)
  }, [count, currentPage, posts?.length])

  const lastPage = Math.max(1, Math.ceil(count / ((Number(process.env.REACT_APP_LIMIT_POSTS) || posts?.length || 1))))
  if (lastPage <= 1) return null

  return (
    <div className='flex items-center justify-center gap-2 py-5'>
      {!isHideStart && <PageNumber setCurrentPage={setCurrentPage} text={1} currentPage={currentPage} />}
      {!isHideStart && currentPage !== 4 && <PageNumber text='...' currentPage={currentPage} />}
      {arrPage.map((item) => <PageNumber key={item} text={item} setCurrentPage={setCurrentPage} currentPage={currentPage} />)}
      {!isHideEnd && <PageNumber text='...' currentPage={currentPage} />}
      {!isHideEnd && <PageNumber icon={<GrLinkNext />} setCurrentPage={setCurrentPage} text={lastPage} currentPage={currentPage} />}
    </div>
  )
}

export default Pagination
