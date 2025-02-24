import React from 'react'
import Conversiation from './Conversiation'
import useGetConversiations from '../../hooks/useGetConversiation';
import { getRandomEmoji } from '../../utils/emojis';

const Conversiations = () => {
  const { loading, conversations } = useGetConversiations();
  console.log("Conversiations", conversations);
  
  return (
    <div className='py-2 flex flex-col overflow-auto'>
      {!loading ? (
        Array.isArray(conversations) && conversations.length > 0 ? (
          conversations.map((conversiation, idx) => (
            <Conversiation 
              key={conversiation._id}
              conversiation={conversiation}
              emoji={getRandomEmoji()}
              lastIdx={idx === conversations.length - 1}
            />
          ))
        ) : (
          <div className="text-center py-2">No conversations found</div>
        )
      ) : (
        <span className='loading loading-spinner mx-auto'></span>
      )}
    </div>
  )
}

export default Conversiations
