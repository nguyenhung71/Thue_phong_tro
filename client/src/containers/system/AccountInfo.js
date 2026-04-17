import React, { useEffect, useMemo, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { apiUpdateCurrentUser } from '../../services'
import * as actions from '../../store/actions'

const initialForm = {
  name: '',
  phone: '',
  email: '',
  zalo: '',
  password: '',
  confirmPassword: '',
}

const AccountInfo = () => {
  const dispatch = useDispatch()
  const { currentData } = useSelector((state) => state.user)
  const [formData, setFormData] = useState(initialForm)
  const [avatarFile, setAvatarFile] = useState(null)
  const [previewUrl, setPreviewUrl] = useState('')
  const [isSaving, setIsSaving] = useState(false)
  const memberCode = currentData?.id?.match(/\d/g)?.join('')?.slice(0, 6) || 'Chưa có dữ liệu'

  useEffect(() => {
    setFormData({
      name: currentData?.name || '',
      phone: currentData?.phone || '',
      email: currentData?.email || '',
      zalo: currentData?.zalo || '',
      password: '',
      confirmPassword: '',
    })
    setAvatarFile(null)
    setPreviewUrl('')
  }, [currentData])

  useEffect(() => {
    return () => {
      if (previewUrl) URL.revokeObjectURL(previewUrl)
    }
  }, [previewUrl])

  const handleChange = (field) => (event) => {
    setFormData((prev) => ({ ...prev, [field]: event.target.value }))
  }

  const handleAvatarChange = (event) => {
    const file = event.target.files?.[0]
    if (!file) return
    if (previewUrl) URL.revokeObjectURL(previewUrl)
    setAvatarFile(file)
    setPreviewUrl(URL.createObjectURL(file))
  }

  const displayAvatar = useMemo(() => previewUrl || currentData?.avatar || 'https://lnsel.com/wp-content/uploads/2018/12/anon-avatar-300x300.png', [currentData?.avatar, previewUrl])

  const handleSubmit = async (event) => {
    event.preventDefault()

    if (!formData.name.trim() || !formData.phone.trim()) {
      window.alert('Vui lòng nhập đầy đủ họ tên và số điện thoại.')
      return
    }

    if (formData.password && formData.password !== formData.confirmPassword) {
      window.alert('Mật khẩu xác nhận không khớp.')
      return
    }

    const payload = new FormData()
    payload.append('name', formData.name.trim())
    payload.append('phone', formData.phone.trim())
    payload.append('email', formData.email.trim())
    payload.append('zalo', formData.zalo.trim())
    if (formData.password) payload.append('password', formData.password)
    if (avatarFile) payload.append('avatar', avatarFile)

    try {
      setIsSaving(true)
      const response = await apiUpdateCurrentUser(payload)
      if (response?.data?.err === 0) {
        window.alert('Cập nhật thông tin cá nhân thành công.')
        dispatch(actions.getCurrent())
        setFormData((prev) => ({ ...prev, password: '', confirmPassword: '' }))
        setAvatarFile(null)
        setPreviewUrl('')
        return
      }

      window.alert(response?.data?.msg || 'Không thể cập nhật thông tin cá nhân.')
    } catch (error) {
      window.alert(error?.response?.data?.msg || 'Không thể cập nhật thông tin cá nhân.')
    } finally {
      setIsSaving(false)
    }
  }

  return (
    <div className='w-full flex justify-center px-4 py-6'>
      <div className='w-full max-w-3xl'>
        <div className='mb-6 text-center'>
          <h1 className='text-2xl font-bold text-gray-800'>Sửa thông tin cá nhân</h1>
          <p className='text-sm text-gray-500 mt-1'>Cập nhật thông tin tài khoản chủ trọ và lưu trực tiếp vào cơ sở dữ liệu.</p>
        </div>

        <form onSubmit={handleSubmit} className='rounded-xl border border-gray-200 bg-white p-6 shadow-sm flex flex-col gap-4'>
          <div className='flex flex-col items-center gap-3 rounded-lg border border-dashed border-gray-300 p-4 bg-slate-50'>
            <img src={displayAvatar} alt='avatar' className='h-24 w-24 rounded-full object-cover border border-gray-200 shadow-sm' />
            <div className='text-center'>
              <p className='text-sm font-medium text-gray-700'>Ảnh đại diện</p>
              <p className='text-xs text-gray-500'>Chọn ảnh mới để cập nhật avatar tài khoản.</p>
            </div>
            <label htmlFor='avatar' className='cursor-pointer rounded-md bg-blue-700 px-4 py-2 text-sm font-medium text-white hover:brightness-95'>
              Chọn ảnh avatar
            </label>
            <input id='avatar' type='file' accept='image/*' className='hidden' onChange={handleAvatarChange} />
            {avatarFile && <span className='text-xs text-gray-500'>{avatarFile.name}</span>}
          </div>

          <div className='grid grid-cols-1 md:grid-cols-2 gap-4'>
            <div className='flex flex-col gap-2'>
              <label className='font-medium text-gray-700' htmlFor='name'>Họ và tên</label>
              <input id='name' className='rounded-md border border-gray-300 p-3 outline-none' value={formData.name} onChange={handleChange('name')} />
            </div>
            <div className='flex flex-col gap-2'>
              <label className='font-medium text-gray-700' htmlFor='phone'>Số điện thoại</label>
              <input id='phone' className='rounded-md border border-gray-300 p-3 outline-none' value={formData.phone} onChange={handleChange('phone')} />
            </div>
            <div className='flex flex-col gap-2'>
              <label className='font-medium text-gray-700' htmlFor='email'>Email</label>
              <input id='email' type='email' className='rounded-md border border-gray-300 p-3 outline-none' value={formData.email} onChange={handleChange('email')} />
            </div>
            <div className='flex flex-col gap-2'>
              <label className='font-medium text-gray-700' htmlFor='zalo'>Zalo</label>
              <input id='zalo' className='rounded-md border border-gray-300 p-3 outline-none' value={formData.zalo} onChange={handleChange('zalo')} />
            </div>
            <div className='flex flex-col gap-2'>
              <label className='font-medium text-gray-700' htmlFor='password'>Mật khẩu mới</label>
              <input id='password' type='password' className='rounded-md border border-gray-300 p-3 outline-none' value={formData.password} onChange={handleChange('password')} placeholder='Bỏ trống nếu không đổi mật khẩu' />
            </div>
            <div className='flex flex-col gap-2'>
              <label className='font-medium text-gray-700' htmlFor='confirmPassword'>Xác nhận mật khẩu mới</label>
              <input id='confirmPassword' type='password' className='rounded-md border border-gray-300 p-3 outline-none' value={formData.confirmPassword} onChange={handleChange('confirmPassword')} placeholder='Nhập lại mật khẩu mới' />
            </div>
          </div>

          <div className='grid grid-cols-1 md:grid-cols-2 gap-4 rounded-lg bg-slate-50 p-4 text-sm text-gray-600'>
            <div><span className='font-medium text-gray-700'>Mã thành viên: </span>{memberCode}</div>
            <div><span className='font-medium text-gray-700'>Vai trò: </span>{currentData?.roleId || 'Chưa có dữ liệu'}</div>
          </div>

          <div className='flex justify-end'>
            <button type='submit' className='rounded-md bg-blue-700 px-5 py-3 font-medium text-white hover:brightness-95' disabled={isSaving}>
              {isSaving ? 'Đang lưu...' : 'Lưu thay đổi'}
            </button>
          </div>
        </form>
      </div>
    </div>
  )
}

export default AccountInfo
