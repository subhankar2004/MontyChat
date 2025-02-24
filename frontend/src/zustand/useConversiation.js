import {create} from 'zustand'

const useConversiation=create((set)=>({
  selectedConversiation:null,
  setSelectedConversiation:(selectedConversiation)=>set({selectedConversiation}),
  messages:[],
  setMessages:(messages)=>set({messages}),
}))

export default useConversiation;