const express = require("express");
require("dotenv").config();
const cookieParser = require("cookie-parser");
const {dbConnect} = require("./config/Database");
const adminRoutes = require("./routes/AdminRoutes");
const studentRoutes = require("./routes/StudentRoutes");

const app = express();
const PORT = process.env.PORT || 4001

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