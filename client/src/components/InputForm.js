import React, { memo } from 'react'

const INPUT_TYPE_MAP = {
  phone: 'tel',
  otp: 'text',
  password: 'password',
  confirmPassword: 'password',
  newPassword: 'password',
  email: 'email',
}

const InputForm = ({
  label,
  value,
  setValue,
  keyPayload,
  invalidFields = [],
  setInvalidFields,
  type,
}) => {
  const fieldKey = keyPayload || type
  const inputType = INPUT_TYPE_MAP[type] || 'text'

  return (
    <div className='flex flex-col gap-1'>
      <label htmlFor={fieldKey} className='text-sm font-medium text-gray-700'>
        {label}
      </label>
      <input
        type={inputType}
        id={fieldKey}
        name={fieldKey}
        className='w-full rounded-md border border-slate-300 bg-slate-50 p-3 text-gray-900 outline-none transition focus:border-secondary focus:bg-white focus:ring-2 focus:ring-blue-100'
        value={value ?? ''}
        onChange={(e) => setValue((prev) => ({ ...prev, [fieldKey]: e.target.value }))}
        onFocus={() => setInvalidFields?.([])}
        autoComplete={fieldKey}
      />
      {invalidFields.length > 0 && invalidFields.some((item) => item.name === fieldKey) && (
        <small className='text-red-500 italic'>
          {invalidFields.find((item) => item.name === fieldKey)?.message}
        </small>
      )}
    </div>
  )
}

export default memo(InputForm)
