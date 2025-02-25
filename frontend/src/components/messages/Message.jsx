import React from 'react'
import { useAuthContext } from '../../context/AuhContext'
import useConversiation from '../../zustand/useConversiation';
import { extractTime } from '../../utils/extractTime';

const Message = ({message}) => {
  const {authUser}=useAuthContext();
  const{selectedConversiation}=useConversiation();
  const fromMe=message.senderId===authUser._id;
  const chatClassName=fromMe ? "chat chat-end" : "chat chat-start";
  const profilePic=fromMe ? authUser?.profilePic : selectedConversiation?.profilePic;
  const bubbleBgColor=fromMe ? "bg-blue-500" : "bg-gray-500";
  const formattedTime=extractTime(message.createdAt);
  return (
    <div className={`chat ${chatClassName}`}>
      <div className='chat-image avatar'>
        <div className='w-10 rounded-full'>
          <img
          src={profilePic} 
          alt="Tailwind Css chat bubble component" />
        </div>
      </div>
      <div className={`chat-bubble text-white ${bubbleBgColor} pb-2`}>
       {message.message}
      </div>
      <div className='chat-footer opacity-50 text-xs flex gap-1 items-center'>
      {formattedTime}
      </div>
    </div>
  )
}

export default Message
