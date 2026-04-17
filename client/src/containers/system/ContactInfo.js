import React from 'react'
import { useSelector } from 'react-redux'

const ContactInfo = () => {
  const { currentData } = useSelector((state) => state.user)

  const contactItems = [
    { label: 'S\u1ed1 \u0111i\u1ec7n tho\u1ea1i', value: currentData?.phone || 'Ch\u01b0a c\u1eadp nh\u1eadt' },
    { label: 'Zalo', value: currentData?.zalo || currentData?.phone || 'Ch\u01b0a c\u1eadp nh\u1eadt' },
  ]

  return (
    <div className='w-full max-w-3xl flex flex-col gap-6'>
      <div>
        <h1 className='text-2xl font-bold text-gray-800'>{'Li\u00ean h\u1ec7'}</h1>
        <p className='text-sm text-gray-500 mt-1'>{'Th\u00f4ng tin li\u00ean h\u1ec7 hi\u1ec7n t\u1ea1i c\u1ee7a t\u00e0i kho\u1ea3n.'}</p>
      </div>

      <div className='grid grid-cols-1 gap-4'>
        {contactItems.map((item) => (
          <div key={item.label} className='rounded-xl border border-gray-200 bg-white p-5 shadow-sm'>
            <p className='text-sm font-medium text-gray-500'>{item.label}</p>
            <p className='mt-2 text-lg font-semibold text-gray-800 break-all'>{item.value}</p>
          </div>
        ))}
      </div>
    </div>
  )
}

export default ContactInfo
