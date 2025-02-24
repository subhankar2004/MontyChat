import React, { useState } from 'react'
import { BiSend } from 'react-icons/bi'
import useSendMessage from '../../hooks/useSendMessage';

const MessageInput = () => {
  const [message,setMessage]=useState('');
  const {loading,sendMessage}=useSendMessage();
  const handleSubmit=async(e)=>{
    e.preventDefault();
    if(!message) return;
    await sendMessage(message);
    setMessage('');
  }
  return (
   <form action="#" className='px-4 my-3'onSubmit={handleSubmit}>
    <div className='w-full relative'>
      <input type="text" className='border text-sm rounded-lg block w-full p-2.5 border-gray-600 text-white' 
        placeholder='Send a message...'
        value={message}
        onChange={(e)=>setMessage(e.target.value)}
      />
      <button type='submit' className='bg-sky-500 text-white rounded-lg p-2.5 absolute right-2.5 bottom-1.5 '>
        {loading?<span className='loading loading-spinner'></span>:<BiSend className='w-3 h-3 rotate-[-45deg]'/>}
      </button>
    </div>
   </form>
  )
}

export default MessageInput
