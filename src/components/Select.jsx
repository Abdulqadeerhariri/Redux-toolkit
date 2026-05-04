import React, { useId } from 'react'

const Select = ({
    options,
    label,
    className,
    ...props
}, ref) => {
    const id = useId()
    return (
        <div className='w-full'>
            {label && <label htmlFor={id} className='block mb-2 text-sm font-medium text-gray-300'>{label}</label>}
            <select {...props} id={id} ref={ref}
                className={`px-4 py-3 rounded-lg bg-gray-700 text-white outline-none focus:bg-gray-600 duration-200 border border-gray-600 focus:border-blue-500 w-full ${className}`}
            >
                {options?.map((option) => (
                    <option key={option} value={option} className="bg-gray-700">
                        {option}
                    </option>
                ))}
            </select>
        </div>
    )
}

export default React.forwardRef(Select)