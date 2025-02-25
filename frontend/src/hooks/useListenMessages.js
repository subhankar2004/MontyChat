import { useSocketContext } from "../context/SocketContext";
import useConversiation from "../zustand/useConversiation";
import { useEffect } from "react";
import notificationSound from "../assets/sounds/notification.mp3";

const useListenMessages = () => {
  const { socket } = useSocketContext();
  const { messages, setMessages } = useConversiation(); 

  useEffect(() => {
    if (!socket) return;

    socket.on("newMessage", (newMessage) => { 
      newMessage.shouldShake=true;
      const sound=new Audio(notificationSound);
      sound.play();
      setMessages((prevMessages) => [...prevMessages, newMessage]); // 
    });

    return () => {
      socket.off("newMessage");
    };
  }, [socket, setMessages]);

  return null; // Hooks shouldn't return JSX
};

export default useListenMessages;
