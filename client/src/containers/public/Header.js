import React, { useEffect, useMemo, useRef, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { useSearchParams } from 'react-router-dom'
import logo from '../../assets/logowithoutbg.png'
import { Button, User } from '../../components'
import * as actions from '../../store/actions'
import menuManage from '../../ultils/menuManage'
import icons from '../../ultils/icons'

const { AiOutlineLogout, AiOutlinePlusCircle, BsChevronDown } = icons

const Header = () => {
  const dispatch = useDispatch()
  const [searchParams] = useSearchParams()
  const currentPage = searchParams.get('page') || '1'
  const headerRef = useRef()
  const { isLoggedIn, roleId } = useSelector((state) => state.auth)
  const [isShowMenu, setIsShowMenu] = useState(false)

  useEffect(() => {
    headerRef.current?.scrollIntoView({ behavior: 'smooth', block: 'start' })
  }, [currentPage])

  const loginPath = useMemo(() => '/login', [])
  const createPostPath = useMemo(() => '/he-thong/tao-moi-bai-dang', [])
  const canCreatePost = roleId === 'LANDLORD' || roleId === 'ADMIN'
  const visibleMenuManage = canCreatePost ? menuManage : menuManage.filter((item) => item.path !== createPostPath)

  const handleGoLogin = (isRegisterMode) => {
    window.location.assign(isRegisterMode ? `${loginPath}?mode=register` : loginPath)
  }

  const handleCreatePost = () => {
    if (!isLoggedIn) {
      window.location.assign(loginPath)
      return
    }

    if (!canCreatePost) {
      window.alert('Chỉ tài khoản chủ trọ hoặc quản trị viên mới được đăng tin.')
      return
    }

    window.location.assign(createPostPath)
  }

  const handleLogout = () => {
    setIsShowMenu(false)
    dispatch(actions.logout())
    window.location.assign('/')
  }

  return (
    <div ref={headerRef} className='w-4/5 lg:w-3/5'>
      <div className='w-full flex flex-col gap-4 lg:flex-row lg:items-center lg:justify-between'>
        <a href='/'>
          <img src={logo} alt='logo' className='w-[240px] h-[70px] object-contain' />
        </a>
        <div className='flex flex-col gap-3 items-start lg:flex-row lg:items-center lg:gap-2'>
          {!isLoggedIn && (
            <div className='flex flex-col gap-2 sm:flex-row sm:items-center sm:gap-2'>
              <small>Phongtro123.com xin chào!</small>
              <div className='flex items-center gap-2'>
                <Button text='Đăng nhập' bgColor='bg-secondary' onClick={() => handleGoLogin(false)} />
                <Button text='Đăng ký' bgColor='bg-secondary' onClick={() => handleGoLogin(true)} />
              </div>
            </div>
          )}
          {isLoggedIn && (
            <div className='flex items-center gap-3 relative'>
              <User />
              <Button
                text='Quản lý tài khoản'
                bgColor='bg-blue-700'
                px='px-4'
                IcAfter={BsChevronDown}
                onClick={() => setIsShowMenu((prev) => !prev)}
              />
              {isShowMenu && (
                <div className='absolute min-w-200 top-full bg-white shadow-md rounded-md p-4 right-0 flex flex-col z-10'>
                  {visibleMenuManage.map((item) => (
                    <a
                      className='hover:text-orange-500 flex items-center gap-2 text-blue-600 border-b border-gray-200 py-2'
                      key={item.id}
                      href={item.path}
                      onClick={() => setIsShowMenu(false)}
                    >
                      {item.icon}
                      {item.text}
                    </a>
                  ))}
                  <span className='cursor-pointer hover:text-orange-500 text-blue-500 py-2 flex items-center gap-2' onClick={handleLogout}>
                    <AiOutlineLogout />
                    Đăng xuất
                  </span>
                </div>
              )}
            </div>
          )}
          <Button text='Đăng tin mới' bgColor='bg-secondary2' IcAfter={AiOutlinePlusCircle} onClick={handleCreatePost} />
        </div>
      </div>
    </div>
  )
}

export default Header
