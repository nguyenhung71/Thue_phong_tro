import React from 'react'
import { Outlet } from 'react-router-dom'
import { Contact, Intro } from '../../components'
import Header from './Header'
import { Navigation, Search } from './index'

const Home = () => {
  return (
    <div className='w-full flex gap-6 flex-col items-center h-full'>
      <Header />
      <Navigation />
      <Search />
      <div className='w-4/5 lg:w-3/5 flex flex-col items-start justify-start mt-3'>
        <Outlet />
      </div>
      <Intro />
      <Contact />
      <div className='h-[500px]'></div>
    </div>
  )
}

export default Home
