import React from 'react'
import { BiSend } from 'react-icons/bi'

const MessageInput = () => {
  return (
   <form action="#" className='px-4 my-3'>
    <div className='w-full relative'>
      <input type="text" className='border text-sm rounded-lg block w-full p-2.5 border-gray-600 text-white' 
        placeholder='Send a message...'
      />
      <button type='submit' className='bg-sky-500 text-white rounded-lg p-2.5 absolute right-2.5 bottom-1.5 '>
        <BiSend className='w-3 h-3 rotate-[-45deg]'/>
      </button>
    </div>
   </form>
  )
}

export default MessageInput
