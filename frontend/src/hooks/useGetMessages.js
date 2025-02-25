import { useEffect, useState } from "react";
import useConversiation from "../zustand/useConversiation";
import { toast } from "react-hot-toast"; // Importing toast for error handling

const useGetMessages = () => {
  const [loading, setLoading] = useState(false);
  const [messagesData, setMessagesData] = useState([]); // Local state to store messages
  const { setMessages, selectedConversiation } = useConversiation();

  useEffect(() => {
    const getMessages = async () => {
      if (!selectedConversiation?._id) return; // Guard clause to avoid fetching without an ID

      setLoading(true);
      try {
        const res = await fetch(`http://localhost:8000/api/messages/${selectedConversiation._id}`, {
          method: "GET",
          headers: { "Content-Type": "application/json" },
          credentials: "include"
        });

        const data = await res.json();
        if (data.error) {
          throw new Error(data.error);
        }

        console.log("API Response:", data); // Log the API response

        // Fix: Extracting the messages array from the response object
        setMessagesData(data.messages || []);
        setMessages(data.messages || []);
      } catch (error) {
        console.error("Error fetching messages:", error);
        toast.error(error.message);
      } finally {
        setLoading(false);
      }
    };

    getMessages();
  }, [selectedConversiation?._id, setMessages]); // Fixed dependency array syntax

  return { loading, messages: messagesData }; // Return local state for component use
};

export default useGetMessages;
