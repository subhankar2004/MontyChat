import express from 'express';
import dotenv from 'dotenv';
import authRoutes from './routes/auth.routes.js';
import messageRoutes from './routes/message.routes.js';
import userRoutes from './routes/users.routes.js';
import connectToMongoDB from './db/connectToMongoDB.js';
import cookieParser from 'cookie-parser';
import cors from 'cors';



const app = express();
const PORT=process.env.PORT || 8000;

dotenv.config();

const corsOptions = {
  origin: ["http://localhost:5173"], // Array of allowed origins
  credentials: true,
  methods: ["GET", "POST", "PUT", "DELETE"],
  allowedHeaders: ["Content-Type", "Authorization"]
};

// CORS configuration
app.use(cors(corsOptions));


app.use(express.json());//to parse json incomming payloads
app.use(cookieParser());


app.use("/api/auth",authRoutes);
app.use("/api/messages",messageRoutes);
app.use("/api/users",userRoutes);



app.get('/', (req, res) => {
  res.send('Hello World!');
});


app.listen(PORT, () => {
  connectToMongoDB();
  console.log(`Server is running on port ${PORT}`);
});