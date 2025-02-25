import { Server } from "socket.io";
import http from "http";
import express from "express";
import cors from "cors";

const app=express();

const server=http.createServer(app);
const io=new Server(server,{
  cors: {
    origin: "http://localhost:5173",
    methods: ["GET", "POST"],
  }
});

const userSocketMap={}; //{userId:socketId}

io.on('connection', (socket) => {
  console.log('a user connected',socket.id);

  const userId=socket.handshake.query.userId;
  if(userId!=="undefined")userSocketMap[userId]=socket.id;

  //io.emit() method is used to send events to all connected clients
  io.emit("getOnlineUsers",Object.keys(userSocketMap)); 

  //socket.on() method is used to listen to events. can be used both on client ad server side
  socket.on('disconnect', () => {
    console.log('user disconnected',socket.id);
    delete userSocketMap[userId];
    io.emit("getOnlineUsers",Object.keys(userSocketMap));
  });
});

export {app,io,server};