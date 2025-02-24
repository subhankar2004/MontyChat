import { useEffect, useState } from "react";
import toast from "react-hot-toast";

const useGetConversations = () => {
  const [loading, setLoading] = useState(false);
  const [conversations, setConversations] = useState([]);

  useEffect(() => {
    const getConversations = async () => {
      setLoading(true);
      try {
        console.log("Making fetch request...");
        const res = await fetch("http://localhost:8000/api/users", {
          method: "GET",
          credentials: "include",
          headers: {
            "Content-Type": "application/json"
          }
        });

        console.log("Response received:", res.status);
        
        if (!res.ok) {
          throw new Error("Failed to fetch conversations");
        }

        const data = await res.json();
        console.log("Data received:", data);
        
        setConversations(data);
        console.log("Conversations state updated:", data);
      } catch (error) {
        console.error("Error in fetch:", error);
        toast.error(error.message);
        setConversations([]);
      } finally {
        setLoading(false);
      }
    };

    getConversations();
  }, []);

  console.log("Hook returning conversations:", conversations);
  return { loading, conversations };
};

export default useGetConversations;