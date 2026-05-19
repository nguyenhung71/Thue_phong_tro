import React, { useEffect, useMemo, useState } from 'react'
import { Navigate } from 'react-router-dom'
import { useSelector } from 'react-redux'
import { toast } from 'react-toastify'
import { apiDeleteUserByAdmin, apiGetUsers, apiUpdateUserByAdmin } from '../../services'
import { path } from '../../ultils/constant'

const initialEditForm = {
  name: '',
  phone: '',
  email: '',
  zalo: '',
  roleId: 'TENANT',
  password: '',
}

const roleLabels = {
  ADMIN: 'Quản trị viên',
  LANDLORD: 'Chủ trọ',
  TENANT: 'Người thuê',
}

const getMemberCode = (id) => id?.match(/\d/g)?.join('')?.slice(0, 6) || id || ''
const getRoleLabel = (roleId) => roleLabels[roleId] || roleId || 'Chưa cập nhật'

const ManageUsers = () => {
  const [users, setUsers] = useState([])
  const [isLoading, setIsLoading] = useState(true)
  const [isSaving, setIsSaving] = useState(false)
  const [editingUser, setEditingUser] = useState(null)
  const [editForm, setEditForm] = useState(initialEditForm)
  const [refreshKey, setRefreshKey] = useState(0)
  const { roleId } = useSelector((state) => state.auth)

  useEffect(() => {
    const fetchUsers = async () => {
      try {
        setIsLoading(true)
        const response = await apiGetUsers()
        if (response?.data?.err === 0) {
          setUsers(response.data.response || [])
          return
        }
        toast.error(response?.data?.msg || 'Không thể tải danh sách người dùng.')
      } catch (error) {
        toast.error(error?.response?.data?.msg || 'Không thể tải danh sách người dùng.')
      } finally {
        setIsLoading(false)
      }
    }

    fetchUsers()
  }, [refreshKey])

  const sortedUsers = useMemo(() => {
    return [...users].sort((a, b) => {
      if (a.roleId === 'ADMIN' && b.roleId !== 'ADMIN') return -1
      if (a.roleId !== 'ADMIN' && b.roleId === 'ADMIN') return 1
      return (a.name || '').localeCompare(b.name || '')
    })
  }, [users])

  const openEditModal = (user) => {
    setEditingUser(user)
    setEditForm({
      name: user?.name || '',
      phone: user?.phone || '',
      email: user?.email || '',
      zalo: user?.zalo || '',
      roleId: user?.roleId || 'TENANT',
      password: '',
    })
  }

  const closeEditModal = () => {
    setEditingUser(null)
    setEditForm(initialEditForm)
  }

  const handleChange = (field) => (event) => {
    setEditForm((prev) => ({ ...prev, [field]: event.target.value }))
  }

  const handleUpdateUser = async (event) => {
    event.preventDefault()
    if (!editingUser) return

    if (!editForm.name.trim() || !editForm.phone.trim() || !editForm.roleId) {
      toast.error('Vui lòng nhập đầy đủ họ tên, số điện thoại và vai trò.')
      return
    }

    try {
      setIsSaving(true)
      const payload = {
        name: editForm.name.trim(),
        phone: editForm.phone.trim(),
        email: editForm.email.trim(),
        zalo: editForm.zalo.trim(),
        roleId: editForm.roleId,
      }

      if (editForm.password.trim()) payload.password = editForm.password.trim()

      const response = await apiUpdateUserByAdmin(editingUser.id, payload)
      if (response?.data?.err === 0) {
        toast.success('Cập nhật người dùng thành công.')
        closeEditModal()
        setRefreshKey((prev) => prev + 1)
        return
      }

      toast.error(response?.data?.msg || 'Không thể cập nhật người dùng.')
    } catch (error) {
      toast.error(error?.response?.data?.msg || 'Không thể cập nhật người dùng.')
    } finally {
      setIsSaving(false)
    }
  }

  const handleDeleteUser = async (user) => {
    const confirmed = window.confirm(`Xóa người dùng ${user?.name || ''} khỏi hệ thống? Hành động này sẽ xóa cả dữ liệu liên quan trong cơ sở dữ liệu.`)
    if (!confirmed) return

    try {
      const response = await apiDeleteUserByAdmin(user.id)
      if (response?.data?.err === 0) {
        toast.success('Đã xóa người dùng khỏi hệ thống.')
        if (editingUser?.id === user.id) closeEditModal()
        setRefreshKey((prev) => prev + 1)
        return
      }

      toast.error(response?.data?.msg || 'Không thể xóa người dùng.')
    } catch (error) {
      toast.error(error?.response?.data?.msg || 'Không thể xóa người dùng.')
    }
  }

  if (roleId !== 'ADMIN') return <Navigate to={path.HOME} replace />

  return (
    <div className='w-full p-4 md:p-6 flex flex-col gap-6'>
      <div>
        <h1 className='text-2xl font-bold text-gray-800'>Quản lý người dùng</h1>
        <p className='text-sm text-gray-500 mt-1'>Admin có thể xem, chỉnh sửa vai trò và xóa người dùng khỏi hệ thống.</p>
      </div>

      <div className='rounded-xl border border-gray-200 bg-white shadow-sm overflow-hidden'>
        <div className='overflow-x-auto'>
          <table className='min-w-full text-sm'>
            <thead className='bg-slate-100 text-left text-gray-700'>
              <tr>
                <th className='px-4 py-3 font-semibold'>Mã thành viên</th>
                <th className='px-4 py-3 font-semibold'>Tên</th>
                <th className='px-4 py-3 font-semibold'>SĐT</th>
                <th className='px-4 py-3 font-semibold'>Vai trò</th>
                <th className='px-4 py-3 font-semibold text-right'>Thao tác</th>
              </tr>
            </thead>
            <tbody>
              {isLoading && (
                <tr>
                  <td className='px-4 py-6 text-center text-gray-500' colSpan='5'>Đang tải danh sách người dùng...</td>
                </tr>
              )}
              {!isLoading && sortedUsers.length === 0 && (
                <tr>
                  <td className='px-4 py-6 text-center text-gray-500' colSpan='5'>Chưa có người dùng nào trong hệ thống.</td>
                </tr>
              )}
              {!isLoading && sortedUsers.map((user) => (
                <tr key={user.id} className='border-t border-gray-100 align-top'>
                  <td className='px-4 py-4 font-medium text-gray-800'>{getMemberCode(user.id)}</td>
                  <td className='px-4 py-4 text-gray-700'>{user.name || 'Chưa cập nhật'}</td>
                  <td className='px-4 py-4 text-gray-700'>{user.phone || 'Chưa cập nhật'}</td>
                  <td className='px-4 py-4'>
                    <span className='inline-flex rounded-full bg-slate-100 px-3 py-1 text-xs font-semibold text-slate-700'>{getRoleLabel(user.roleId || user.role?.id)}</span>
                  </td>
                  <td className='px-4 py-4'>
                    <div className='flex justify-end gap-2'>
                      <button type='button' className='rounded-md bg-blue-700 px-3 py-2 text-white hover:brightness-95' onClick={() => openEditModal(user)}>
                        Sửa
                      </button>
                      <button type='button' className='rounded-md bg-red-600 px-3 py-2 text-white hover:brightness-95' onClick={() => handleDeleteUser(user)}>
                        Xóa
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {editingUser && (
        <div className='fixed inset-0 z-50 flex items-center justify-center bg-black/40 p-4'>
          <div className='w-full max-w-2xl rounded-xl bg-white p-6 shadow-xl'>
            <div className='flex items-start justify-between gap-4 mb-4'>
              <div>
                <h2 className='text-xl font-bold text-gray-800'>Chỉnh sửa người dùng</h2>
                <p className='text-sm text-gray-500 mt-1'>Cập nhật thông tin, vai trò hoặc mật khẩu của người dùng.</p>
              </div>
              <button type='button' className='text-gray-500 hover:text-gray-700' onClick={closeEditModal}>Đóng</button>
            </div>

            <form onSubmit={handleUpdateUser} className='grid grid-cols-1 md:grid-cols-2 gap-4'>
              <div className='flex flex-col gap-2'>
                <label className='font-medium text-gray-700' htmlFor='edit-name'>Họ và tên</label>
                <input id='edit-name' className='rounded-md border border-gray-300 p-3 outline-none' value={editForm.name} onChange={handleChange('name')} />
              </div>
              <div className='flex flex-col gap-2'>
                <label className='font-medium text-gray-700' htmlFor='edit-phone'>Số điện thoại</label>
                <input id='edit-phone' className='rounded-md border border-gray-300 p-3 outline-none' value={editForm.phone} onChange={handleChange('phone')} />
              </div>
              <div className='flex flex-col gap-2'>
                <label className='font-medium text-gray-700' htmlFor='edit-email'>Email</label>
                <input id='edit-email' type='email' className='rounded-md border border-gray-300 p-3 outline-none' value={editForm.email} onChange={handleChange('email')} />
              </div>
              <div className='flex flex-col gap-2'>
                <label className='font-medium text-gray-700' htmlFor='edit-zalo'>Zalo</label>
                <input id='edit-zalo' className='rounded-md border border-gray-300 p-3 outline-none' value={editForm.zalo} onChange={handleChange('zalo')} />
              </div>
              <div className='flex flex-col gap-2'>
                <label className='font-medium text-gray-700' htmlFor='edit-role'>Vai trò</label>
                <select id='edit-role' className='rounded-md border border-gray-300 p-3 outline-none bg-white' value={editForm.roleId} onChange={handleChange('roleId')}>
                  <option value='ADMIN'>Quản trị viên</option>
                  <option value='LANDLORD'>Chủ trọ</option>
                  <option value='TENANT'>Người thuê</option>
                </select>
              </div>
              <div className='flex flex-col gap-2'>
                <label className='font-medium text-gray-700' htmlFor='edit-password'>Mật khẩu mới</label>
                <input id='edit-password' type='password' className='rounded-md border border-gray-300 p-3 outline-none' value={editForm.password} onChange={handleChange('password')} placeholder='Bỏ trống nếu không đổi' />
              </div>

              <div className='md:col-span-2 rounded-lg bg-slate-50 p-4 text-sm text-gray-600'>
                <div><span className='font-medium text-gray-700'>Mã thành viên:</span> {getMemberCode(editingUser.id)}</div>
                <div className='mt-1'><span className='font-medium text-gray-700'>Vai trò hiện tại:</span> {getRoleLabel(editingUser.roleId)}</div>
              </div>

              <div className='md:col-span-2 flex justify-end gap-3 pt-2'>
                <button type='button' className='rounded-md border border-gray-300 px-4 py-3 text-gray-700 hover:bg-gray-50' onClick={closeEditModal}>
                  Hủy
                </button>
                <button type='submit' className='rounded-md bg-blue-700 px-5 py-3 font-medium text-white hover:brightness-95' disabled={isSaving}>
                  {isSaving ? 'Đang lưu...' : 'Lưu thay đổi'}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  )
}

export default ManageUsers
