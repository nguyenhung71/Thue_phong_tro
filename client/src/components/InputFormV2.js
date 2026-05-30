import React from 'react'

const InputFormV2 = ({ label, unit, value, setValue, name, small, invalidFields, setInvalidFields }) => {
    return (
        <div>
            <label htmlFor={name}>{label}</label>
            <div className='flex items-center'>
                <input
                    type="text"
                    id={name}
                    className={`${unit ? 'rounded-tl-md rounded-bl-md' : 'rounded-md'} outline-none border flex-auto border-gray-300 p-2`}
                    value={value}
                    onChange={(e) => {
                        setValue(prev => ({ ...prev, [name]: e.target.value }))
                        if (invalidFields?.some(item => item.name === name)) {
                            setInvalidFields(prev => prev.filter(item => item.name !== name))
                        }
                    }}
                    onFocus={() => {
                        if (invalidFields?.some(item => item.name === name)) {
                            setInvalidFields(prev => prev.filter(item => item.name !== name))
                        }
                    }}
                />
                {unit && <span className='p-2 border flex-none w-16 flex items-center justify-center rounded-tr-md rounded-br-md bg-gray-200'>{unit}</span>}
            </div>
            {small && <small className='opacity-70 block'>{small}</small>}
            {invalidFields?.some(item => item.name === name) && (
                <small className='text-red-500 italic block mt-1'>
                    {invalidFields.find(item => item.name === name)?.message}
                </small>
            )}
        </div>
    )
}

export default InputFormV2