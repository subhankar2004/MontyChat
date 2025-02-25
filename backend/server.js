import express from "express";
import dotenv from "dotenv";
import http from "http"; // ✅ Import HTTP module
import { Server } from "socket.io"; // ✅ Import Socket.io
import cors from "cors";
import cookieParser from "cookie-parser";
import connectToMongoDB from "./db/connectToMongoDB.js";
import authRoutes from "./routes/auth.routes.js";
import messageRoutes from "./routes/message.routes.js";
import userRoutes from "./routes/users.routes.js";

dotenv.config();
const app = express();
const PORT = process.env.PORT || 8000;

// ✅ Create an HTTP server with Express
const server = http.createServer(app);

// ✅ Configure CORS for Express and Socket.io
const corsOptions = {
  origin: "http://localhost:5173",
  credentials: true,
  methods: ["GET", "POST", "PUT", "DELETE"],
  allowedHeaders: ["Content-Type", "Authorization"],
};
app.use(cors(corsOptions));
app.use(express.json());
app.use(cookieParser());

// ✅ Initialize Socket.io with CORS
const io = new Server(server, {
  cors: {
    origin: "http://localhost:5173",
    methods: ["GET", "POST"],
    credentials: true,
  },
});

// ✅ Handle WebSocket connections
io.on("connection", (socket) => {
  console.log("🔗 A user connected:", socket.id);

  socket.on("disconnect", () => {
    console.log("❌ User disconnected:", socket.id);
  });
});

// ✅ API Routes
app.use("/api/auth", authRoutes);
app.use("/api/messages", messageRoutes);
app.use("/api/users", userRoutes);

// ✅ Root endpoint
app.get("/", (req, res) => {
  res.send("Hello World!");
});

// ✅ Start the server
server.listen(PORT, () => {
  connectToMongoDB();
  console.log(`🚀 Server running on port ${PORT}`);
});
