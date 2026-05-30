import React, { memo } from 'react'

const Select = ({ label, options, value, setValue, type, reset, name, invalidFields, setInvalidFields }) => {

    return (
        <div className='flex flex-col gap-2 flex-1'>
            <label className='font-medium' htmlFor={name || "select-address"}>{label}</label>
            <select
                value={reset ? '' : value}
                onChange={(e) => {
                    if (!name) {
                        setValue(e.target.value)
                    } else {
                        setValue(prev => ({ ...prev, [name]: e.target.value }))
                    }
                    if (name && invalidFields?.some(item => item.name === name)) {
                        setInvalidFields(prev => prev.filter(item => item.name !== name))
                    }
                }}
                onFocus={() => {
                    if (name && invalidFields?.some(item => item.name === name)) {
                        setInvalidFields(prev => prev.filter(item => item.name !== name))
                    }
                }}
                id={name || "select-address"}
                className='outline-none border border-gray-300 p-2 rounded-md w-full'
            >
                <option value="">{`--Chọn ${label}--`}</option>
                {options?.map(item => {
                    return (
                        <option
                            key={type === 'province' ? item?.province_id : type === 'district' ? item?.district_id : item?.code}
                            value={type === 'province' ? item?.province_id : type === 'district' ? item?.district_id : item?.code}
                        >
                            {type === 'province' ? item?.province_name : type === 'district' ? item?.district_name : item?.value}
                        </option>
                    )
                })}
            </select>
            {name && invalidFields?.some(item => item.name === name) && (
                <small className='text-red-500 italic mt-1'>
                    {invalidFields.find(item => item.name === name)?.message}
                </small>
            )}
        </div>
    )
}

export default memo(Select)