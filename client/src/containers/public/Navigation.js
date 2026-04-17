import React from 'react'
import { NavLink } from 'react-router-dom'
import { navigationItems } from '../../ultils/navigation'

const notActive = 'hover:bg-secondary2 px-4 h-full flex items-center bg-secondary1 whitespace-nowrap'
const active = 'hover:bg-secondary2 px-4 h-full flex items-center bg-secondary2 whitespace-nowrap'

const Navigation = ({ isAdmin }) => {
  return (
    <div className={`w-full flex ${isAdmin ? 'justify-start' : 'justify-center'} items-center h-[40px] bg-secondary1 text-white`}>
      <div className='w-4/5 lg:w-3/5 flex h-full items-center text-sm font-medium overflow-x-auto'>
        {navigationItems.map((item) => (
          <NavLink key={item.path} to={item.path} end={item.path === '/'} className={({ isActive }) => (isActive ? active : notActive)}>
            {item.label}
          </NavLink>
        ))}
      </div>
    </div>
  )
}

export default Navigation
