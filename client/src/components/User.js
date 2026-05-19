import React from 'react'
import { useSelector } from 'react-redux'
import anonAvatar from '../assets/anon-avatar.png'

const User = () => {
    const { currentData } = useSelector(state => state.user)
    const memberCode = currentData?.id?.match(/\d/g)?.join('')?.slice(0, 6) || 'Ch\u01b0a c\u00f3 d\u1eef li\u1ec7u'

    return (
        <div className='flex items-center gap-2'>
            <img src={currentData?.avatar || anonAvatar} alt='avatar' className='w-10 object-cover rounded-full h-10 border-2 shadow-md border-white' />
            <div className='flex flex-col'>
                <span>{'Xin ch\u00e0o, '}<span className='font-semibold'>{currentData?.name}</span></span>
                <span>{'M\u00e3 th\u00e0nh vi\u00ean: '}<span className='font-medium'>{memberCode}</span></span>
            </div>
        </div>
    )
}

export default User
