import React from 'react'
import { Outlet, useLocation } from 'react-router-dom'
import { Contact, Intro } from '../../components'
import Header from './Header'
import { Navigation, Search } from './index'

const Home = () => {
  const location = useLocation()

  const hideSearchPaths = [
    '/login',
    '/forgot-password',
    '/reset-password'
  ]

  const shouldHideSearch = hideSearchPaths.some(path =>
    location.pathname.startsWith(path)
  )

  return (
    <div className='w-full flex gap-6 flex-col items-center h-full'>
      <Header />
      <Navigation />

      {/* 🔥 CHỈ HIỂN THỊ SEARCH KHI KHÔNG PHẢI LOGIN */}
      {!shouldHideSearch && <Search />}

      <div key={`${location.pathname}${location.search}`} className='w-4/5 lg:w-3/5 flex flex-col items-start justify-start mt-3'>
        <Outlet />
      </div>

      <Intro />
      <Contact />
      <div className='h-[500px]'></div>
    </div>
  )
}

export default Home