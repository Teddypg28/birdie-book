import React from 'react'
import TextInput from '../components/TextInput'

const page = () => {
  return (
    <div className='bg-white h-screen overflow-hidden'>
        <div className='m-auto w-fit flex flex-col gap-3 mt-5'>
          <img src='/logo.png' className='w-56 m-auto' draggable={false} />
          <div className='mt-auto flex flex-col gap-3 absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2'>
            <TextInput label='Email' type='email' placeholder='Enter email address' />
            <TextInput label='Password' type='password' placeholder='Enter password' />
            <button className='w-96 rounded-md h-11 text-white' style={{backgroundColor: '#163d23'}}>Login</button>
          </div>
        </div>
    </div>
  )
}

export default page
