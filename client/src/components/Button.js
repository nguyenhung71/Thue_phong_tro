import React, { memo } from 'react'

const Button = ({ text, textColor, bgColor, IcAfter, onClick, fullWidth, px }) => {
  const resolvedTextColor = textColor || 'text-white'
  const resolvedBgColor = bgColor || 'bg-secondary'

  return (
    <button
      type='button'
      className={`inline-flex items-center justify-center gap-1 rounded-md py-2.5 ${px ? px : 'px-4'} ${resolvedTextColor} ${resolvedBgColor} ${fullWidth ? 'w-full' : ''} border border-transparent font-medium shadow-sm transition hover:brightness-95 focus:outline-none focus:ring-2 focus:ring-blue-200`}
      onClick={onClick}
    >
      <span>{text}</span>
      <span>{IcAfter && <IcAfter />}</span>
    </button>
  )
}

export default memo(Button)
