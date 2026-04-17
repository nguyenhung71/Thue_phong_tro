import React, { memo, useEffect, useState } from 'react'
import { InputReadOnly } from '../components'

const Address = ({ payload, setPayload }) => {
  const [streetAddress, setStreetAddress] = useState(payload.address || '')
  const [province, setProvince] = useState(payload.province || '')

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
            onChange={(e) => setStreetAddress(e.target.value)}
            placeholder='Ví dụ: 123 Lê Lợi, Phường Bến Thành'
          />
        </div>
        <div className='flex flex-col gap-2'>
          <label className='font-medium' htmlFor='province'>Tỉnh/Thành phố</label>
          <input
            id='province'
            type='text'
            className='outline-none border border-gray-300 p-2 rounded-md w-full'
            value={province}
            onChange={(e) => setProvince(e.target.value)}
            placeholder='Ví dụ: Hồ Chí Minh'
          />
        </div>
        <InputReadOnly label='Địa chỉ hiển thị' value={[streetAddress, province].filter(Boolean).join(', ')} />
      </div>
    </div>
  )
}

export default memo(Address)