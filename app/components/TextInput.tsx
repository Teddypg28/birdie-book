import React from 'react'

const TextInput = ({placeholder, type, label} : {placeholder?: string, type?: string, label: string}) => {
  return (
    <div className='flex flex-col gap-2'>
        <label className='font-bold text-sm'>{label}</label>
        <input
        style={{outlineColor: '#163d23'}}
        className='w-96 rounded-md p-2 border border-gray-300 text-sm h-11' 
        placeholder={placeholder}
        type={type}
        />
    </div>
  )
}

export default TextInput
