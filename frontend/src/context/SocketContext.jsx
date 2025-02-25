import { createContext, useState, useEffect, useContext } from "react";
import { useAuthContext } from "./AuhContext";
import { io } from "socket.io-client";

const SocketContext = createContext();

export const useSocketContext = () => {
  return useContext(SocketContext);
};

export const SocketContentProvider = ({ children }) => {
  const [socket, setSocket] = useState(null);
  const [onlineUsers, setOnlineUsers] = useState([]);
  const { authUser } = useAuthContext();

  useEffect(() => {
    if (!authUser) return;

    console.log("🔗 Connecting to socket...");

    const newSocket = io("http://localhost:8000", {
      query: { userId: authUser._id },
      withCredentials: true,
      transports: ["websocket"], // ✅ Ensures WebSocket connection
    });

    newSocket.on("connect", () => {
      console.log("✅ Socket connected:", newSocket.id);
    });

    newSocket.on("getOnlineUsers", (users) => {
      setOnlineUsers(users);
    });

    newSocket.on("disconnect", () => {
      console.log("❌ Socket disconnected");
      setSocket(null);
    });

    setSocket(newSocket);

    return () => {
      newSocket.disconnect();
    };
  }, [authUser]);

  return (
    <SocketContext.Provider value={{ socket, onlineUsers }}>
      {children}
    </SocketContext.Provider>
  );
};

export default SocketContentProvider;



