import { create } from 'zustand';

const useConversiation = create((set) => ({
  selectedConversiation: null,
  setSelectedConversiation: (selectedConversiation) => set({ selectedConversiation }),
  messages: [],
  setMessages: (messages) => {
    // Ensure messages is always an array
    const safeMessages = Array.isArray(messages) ? messages : [];
    return set({ messages: safeMessages });
  },
  // Add a helper method to add a single message
  addMessage: (newMessage) => 
    set((state) => ({ 
      messages: Array.isArray(state.messages) 
        ? [...state.messages, newMessage] 
        : [newMessage] 
    }))
}));

export default useConversiation;