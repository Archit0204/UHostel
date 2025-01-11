import express from 'express';
import dotenv from 'dotenv';
import cookieParser from 'cookie-parser';
import { dbConnect } from './config/Database';
import adminRoutes from './routes/AdminRoutes';
import studentRoutes from './routes/StudentRoutes';
import cors from 'cors';

const app = express();
const PORT = process.env.PORT || 4001
dotenv.config();

// middlewares
app.use(express.json());
app.use(cookieParser());
app.use(cors({
    // `origin: ['http://localhost:3000', 'https://9f9d-2401-4900-1c71-d4b5-6129-dd5d-c21d-679d.ngrok-free.app'],
    credentials: true
}));

// db connection
dbConnect();

// routes
app.use("/api/v1/admin", adminRoutes);
app.use("/api/v1/student", studentRoutes);

// starting the server
app.listen(PORT, () => {
    console.log(`App is running at ${PORT}`)
});