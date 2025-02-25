import { useState } from "react";
import useConversiation from "../zustand/useConversiation";
import toast from "react-hot-toast";

const useSendMessage = () => {
  const [loading, setLoading] = useState(false);
  const { messages, setMessages, selectedConversiation } = useConversiation();

  const sendMessage = async (message) => {
    setLoading(true);
    try {
      if (!selectedConversiation?._id) {
        throw new Error("Please select a conversation first");
      }

      const res = await fetch(`http://localhost:8000/api/messages/send/${selectedConversiation._id}`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        credentials: "include",
        body: JSON.stringify({ message })
      });

      const data = await res.json();
      
      if (data.error) {
        throw new Error(data.error);
      }

      // Ensure messages is an array before spreading
      const currentMessages = Array.isArray(messages) ? messages : [];
      setMessages([...currentMessages, data]);
      
    } catch (error) {
      toast.error(error.message);
    } finally {
      setLoading(false);
    }
  };

  return { loading, sendMessage };
};

export default useSendMessage;
