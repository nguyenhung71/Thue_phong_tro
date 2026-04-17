import React from 'react'
import anonAvatar from '../../assets/anon-avatar.png'
import { useSelector, useDispatch } from 'react-redux'
import menuSidebar from '../../ultils/menuSidebar'
import { NavLink } from 'react-router-dom'
import * as actions from '../../store/actions'
import { AiOutlineLogout } from 'react-icons/ai'

const activeStyle = 'hover:bg-gray-200 flex rounded-md items-center gap-2 py-2 font-bold bg-gray-200'
const notActiceStyle = 'hover:bg-gray-200 flex rounded-md items-center gap-2 py-2 cursor-pointer'

const Sidebar = () => {
  const dispatch = useDispatch()
  const { roleId } = useSelector((state) => state.auth)
  const { currentData } = useSelector((state) => state.user)
  const canCreatePost = roleId === 'LANDLORD' || roleId === 'ADMIN'
  const visibleMenuSidebar = canCreatePost
    ? menuSidebar
    : menuSidebar.filter((item) => item.path !== '/he-thong/tao-moi-bai-dang')
  const memberCode = currentData?.id?.match(/\d/g)?.join('')?.slice(0, 6) || 'Ch\u01b0a c\u00f3 d\u1eef li\u1ec7u'

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
        <span>{'M\u00e3 th\u00e0nh vi\u00ean: '}<small className='font-medium'>{memberCode}</small></span>
      </div>
      <div>
        {visibleMenuSidebar.map((item) => (
          <NavLink
            className={({ isActive }) => (isActive ? activeStyle : notActiceStyle)}
            key={item.id}
            to={item?.path}
          >
            {item?.icon}
            {item.text}
          </NavLink>
        ))}
        <span onClick={() => dispatch(actions.logout())} className={notActiceStyle}><AiOutlineLogout />{'Tho\u00e1t'}</span>
      </div>
    </div>
  )
}

export default Sidebar
