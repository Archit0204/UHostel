import express from 'express';
import dotenv from 'dotenv';
import cookieParser from 'cookie-parser';
import { dbConnect } from './config/Database';
import adminRoutes from './routes/AdminRoutes';
import studentRoutes from './routes/StudentRoutes';

const app = express();
const PORT = process.env.PORT || 4001
dotenv.config();

// middlewares
app.use(express.json());
app.use(cookieParser());

// db connection
dbConnect();

// routes
app.use("/api/v1/admin", adminRoutes);
app.use("/api/v1/student", studentRoutes);

// starting the server
app.listen(PORT, () => {
    console.log(`App is running at ${PORT}`)
});