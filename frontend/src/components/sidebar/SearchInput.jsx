import React,{useState} from 'react'
import { IoSearchSharp } from "react-icons/io5";
import useConversiation from '../../zustand/useConversiation';
import useGetConversations from '../../hooks/useGetConversiation';
import toast from 'react-hot-toast';

const SearchInput = () => {
  const [search,setSearch]=useState('');
 const {setSelectedConversiation}= useConversiation();
 const {conversations}=useGetConversations();

 

  const handleSubmit=(e)=>{
    e.preventDefault();
    if(!search) return;
    if(search.length<3) {
      return toast.error("Search must be at least 3 characters");
      
    }

    const conversation=conversations.find((conversation)=>conversation.fullName.toLowerCase().includes(search.toLowerCase()));
    if(conversation){
      setSelectedConversiation(conversation);
      setSearch("");
      return;
    }else{
      return toast.error("Conversation not found");
    }

  }
  return (
    <form className='flex items-center gap-2' onSubmit={handleSubmit}>
      <input type="text"placeholder='Search...' className='input input-bordered rounded-full'
      value={search}
      onChange={(e)=>setSearch(e.target.value)}
       />
      <button type='submit' className='btn btn-circle bg-sky-500 text-white'>
       <IoSearchSharp className='w-6 h-6 outline-none'/>
      </button>
    </form>
  )
}

export default SearchInput
