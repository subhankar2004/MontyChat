import Conversation from "../models/conversiation.model.js";
import Message from "../models/message.model.js";
import { getReceiverSocketId, io } from "../socket/socket.js";

export const sendMessage = async (req, res) => {
  try {
    const { message } = req.body;
    const {userId: receiverId } = req.params;
    const senderId = req.user._id;

    // Add validation to ensure receiverId exists
    if (!receiverId) {
      return res.status(400).json({ error: "ReceiverId is required" });
    }

    let conversation = await Conversation.findOne({
      participants: { $all: [senderId, receiverId] }
    });

    if (!conversation) {
      conversation = await Conversation.create({
        participants: [senderId, receiverId],
        messages: []
      });
    }

    // Create message with explicit type conversion if needed
    const newMessage = new Message({
      senderId: senderId.toString(),
      receiverId: receiverId.toString(), // Ensure receiverId is a string if needed
      message
    });

    await newMessage.save();

    if (newMessage) {
      conversation.messages.push(newMessage._id);
      await conversation.save();
    }
    
    //Socket IO functionality

    // ✅ Socket IO functionality
    const receiverSocketId = getReceiverSocketId(receiverId);
    if (receiverSocketId) {
      io.to(receiverSocketId).emit("newMessage", newMessage); // ✅ Fixed event name
    }

    


    res.status(201).json({ message: newMessage });

  } catch (error) {
    console.log("Error in send message controller", error.message);
    res.status(500).json({ error: error.message });
  }
};

export const getMessages = async (req, res) => {
  try{
    const {userId:userToChatId}=req.params;
    const senderId=req.user._id;

    const conversation=await Conversation.findOne({
      participants:{$all:[senderId,userToChatId]}
    }).populate("messages"); //Not Reference but actual messages
                             //Study about the populate method in mongoose

    if(!conversation){
      return res.status(200).json({messages:[]});
    }

    const messages=conversation.messages;

    res.status(200).json({messages});
  }catch(error){
    console.log("Error in get messages controller",error.message);
    res.status(500).json({error:error.message});
  }
}