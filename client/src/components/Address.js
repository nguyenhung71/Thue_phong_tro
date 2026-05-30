import React, { memo, useEffect, useState } from 'react'
import { InputReadOnly } from '../components'

const Address = ({ payload, setPayload, invalidFields, setInvalidFields }) => {
  const [streetAddress, setStreetAddress] = useState(payload.address || '')
  const [province, setProvince] = useState(payload.province || '')

  useEffect(() => {
    if (payload.address !== undefined && payload.address !== streetAddress) {
      setStreetAddress(payload.address)
    }
  }, [payload.address, streetAddress])

  useEffect(() => {
    if (payload.province !== undefined && payload.province !== province) {
      setProvince(payload.province)
    }
  }, [payload.province, province])

  useEffect(() => {
    setPayload((prev) => ({
      ...prev,
      address: streetAddress,
      province,
    }))
  }, [province, setPayload, streetAddress])

  return (
    <div>
      <h2 className='font-semibold text-xl py-4'>Địa chỉ cho thuê</h2>
      <div className='flex flex-col gap-4'>
        <div className='flex flex-col gap-2'>
          <label className='font-medium' htmlFor='street-address'>Địa chỉ chi tiết</label>
          <input
            id='street-address'
            type='text'
            className='outline-none border border-gray-300 p-2 rounded-md w-full'
            value={streetAddress}
            onChange={(e) => {
              setStreetAddress(e.target.value)
              if (invalidFields?.some(item => item.name === 'address')) {
                setInvalidFields(prev => prev.filter(item => item.name !== 'address'))
              }
            }}
            onFocus={() => {
              if (invalidFields?.some(item => item.name === 'address')) {
                setInvalidFields(prev => prev.filter(item => item.name !== 'address'))
              }
            }}
            placeholder='Ví dụ: 123 Lê Lợi, Phường Bến Thành'
          />
          {invalidFields?.some(item => item.name === 'address') && (
            <small className='text-red-500 italic'>
              {invalidFields.find(item => item.name === 'address')?.message}
            </small>
          )}
        </div>
        <div className='flex flex-col gap-2'>
          <label className='font-medium' htmlFor='province'>Tỉnh/Thành phố</label>
          <input
            id='province'
            type='text'
            className='outline-none border border-gray-300 p-2 rounded-md w-full'
            value={province}
            onChange={(e) => {
              setProvince(e.target.value)
              if (invalidFields?.some(item => item.name === 'province')) {
                setInvalidFields(prev => prev.filter(item => item.name !== 'province'))
              }
            }}
            onFocus={() => {
              if (invalidFields?.some(item => item.name === 'province')) {
                setInvalidFields(prev => prev.filter(item => item.name !== 'province'))
              }
            }}
            placeholder='Ví dụ: Hồ Chí Minh'
          />
          {invalidFields?.some(item => item.name === 'province') && (
            <small className='text-red-500 italic'>
              {invalidFields.find(item => item.name === 'province')?.message}
            </small>
          )}
        </div>
        <InputReadOnly label='Địa chỉ hiển thị' value={[streetAddress, province].filter(Boolean).join(', ')} />
      </div>
    </div>
  )
}

export default memo(Address)