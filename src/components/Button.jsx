import React from 'react'

const Button = ({
    children,
    type ='button',
    bgColor = 'bg-blue-600',
    textColor = 'text-white',
    className = '',
    ...props
}) => {
  return (
    <button className={`px-4 py-2 rounded-lg ${bgColor} ${textColor} hover:opacity-90 transition-opacity duration-200 font-medium ${className}`} {...props}>
        {children}
    </button>
  )
}

export default Button