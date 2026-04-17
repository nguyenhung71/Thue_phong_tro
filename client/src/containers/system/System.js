import React from 'react'
import { useSelector } from 'react-redux'
import { Navigate, Outlet, useLocation } from 'react-router-dom'
import { path } from '../../ultils/constant'
import { Header, Sidebar } from './'

const System = () => {
  const location = useLocation()
  const { isLoggedIn, roleId } = useSelector((state) => state.auth)
  const canCreatePost = roleId === 'LANDLORD' || roleId === 'ADMIN'

  if (!isLoggedIn) return <Navigate to={`/${path.LOGIN}`} replace={true} />
  if (!canCreatePost && location.pathname.includes(path.CREATE_POST)) return <Navigate to='/' replace={true} />

  return (
    <div className='w-full h-screen flex flex-col items-center'>
      <Header />
      <div className='flex w-full flex-auto'>
        <Sidebar />
        <div className='flex-auto bg-white shadow-md h-full p-4'>
          <Outlet />
        </div>
      </div>
    </div>
  )
}

export default System