import React, { forwardRef, useId } from 'react'

const Input = forwardRef(function Input ({
    label,
    type = 'text',
    className = '',
    ...props
}, ref) {
    const id = useId();
    return (
        <div className='w-full'>
            {label && <label className='block mb-2 text-sm font-medium text-gray-300' htmlFor={id}>{label}</label>}
            <input 
                type={type} 
                className={`px-4 py-3 rounded-lg bg-gray-700 text-white outline-none focus:bg-gray-600 duration-200 border border-gray-600 focus:border-blue-500 w-full placeholder-gray-400 ${className}`}
                ref={ref} 
                id={id} 
                {...props}
            />
        </div>
    )
})

export default Input