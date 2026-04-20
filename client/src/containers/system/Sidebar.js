import React from 'react'
import anonAvatar from '../../assets/anon-avatar.png'
import { useSelector, useDispatch } from 'react-redux'
import { useLocation } from 'react-router-dom'
import menuSidebar from '../../ultils/menuSidebar'
import * as actions from '../../store/actions'
import { AiOutlineLogout } from 'react-icons/ai'

const activeStyle = 'hover:bg-gray-200 flex rounded-md items-center gap-2 py-2 font-bold bg-gray-200'
const notActiveStyle = 'hover:bg-gray-200 flex rounded-md items-center gap-2 py-2 cursor-pointer'

const Sidebar = () => {
  const dispatch = useDispatch()
  const location = useLocation()
  const { roleId } = useSelector((state) => state.auth)
  const { currentData } = useSelector((state) => state.user)
  const canCreatePost = roleId === 'LANDLORD' || roleId === 'ADMIN'
  const visibleMenuSidebar = canCreatePost
    ? menuSidebar
    : menuSidebar.filter((item) => item.path !== '/he-thong/tao-moi-bai-dang')
  const memberCode = currentData?.id?.match(/\d/g)?.join('')?.slice(0, 6) || 'Chưa có dữ liệu'

  const handleLogout = () => {
    dispatch(actions.logout())
    window.location.assign('/')
  }

  return (
    <div className='w-[256px] flex-none p-4 flex flex-col gap-6'>
      <div className='flex flex-col gap-4'>
        <div className='flex items-center gap-4'>
          <img src={anonAvatar} alt='avatar' className='w-12 h-12 object-cover rounded-full border-2 border-white' />
          <div className='flex flex-col justify-center'>
            <span className='font-semibold'>{currentData?.name}</span>
            <small>{currentData?.phone}</small>
          </div>
        </div>
        <span>{'Mã thành viên: '}<small className='font-medium'>{memberCode}</small></span>
      </div>
      <div>
        {visibleMenuSidebar.map((item) => (
          <a
            className={location.pathname === item.path ? activeStyle : notActiveStyle}
            key={item.id}
            href={item.path}
          >
            {item.icon}
            {item.text}
          </a>
        ))}
        <span onClick={handleLogout} className={notActiveStyle}><AiOutlineLogout />{'Thoát'}</span>
      </div>
    </div>
  )
}

export default Sidebar
