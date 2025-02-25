import React from "react";
import useConversiation from "../../zustand/useConversiation";
import { useSocketContext } from "../../context/SocketContext";

const Conversiation = ({ conversiation, lastIdx, emoji }) => {
  const { selectedConversiation, setSelectedConversiation } = useConversiation();
  const isSelected = selectedConversiation?._id === conversiation._id;
  const { onlineUsers } = useSocketContext();

  // ✅ Extract user IDs from onlineUsers array
  const onlineUserIds = onlineUsers.map(user => user.userId);
  const isOnline = onlineUserIds.includes(conversiation._id); 

  return (
    <>
      <div
        className={`flex gap-2 items-center hover:bg-sky-500 rounded p-2 py-1 cursor-pointer
      ${isSelected && "bg-sky-500"}`}
        onClick={() => setSelectedConversiation(conversiation)}
      >
        {/* ✅ Fixed avatar online status */}
        <div className={`avatar ${isOnline ? "online" : ""}`}>
          <div className="w-12 rounded-full">
            <img src={conversiation.profilePic} alt="user avatar" />
          </div>
        </div>
        <div className="flex flex-col flex-1">
          <div className="flex gap-3 justify-between">
            <p className="font-bold text-gray-200">{conversiation.fullName}</p>
            <span className="text-xl">{emoji}</span>
          </div>
        </div>
      </div>
      {!lastIdx && <div className="divider my-0 py-0 h-1 " />}
    </>
  );
};

export default Conversiation;

