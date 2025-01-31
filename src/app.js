const express = require("express");
const connectDB = require("./config/database");
const cors = require("cors");
const cookieparser = require("cookie-parser");
const { authRouter } = require("./router/auth");
const { profileRouter } = require("./router/profile");
const { requestRouter } = require("./router/request");
const userRouter = require("./router/user");

const app = express();
const PORT = 3000;

// Middleware
app.use(
  cors({
    origin: "http://localhost:5173", // Frontend origin
    methods: ["GET", "POST", "PUT", "DELETE", "PATCH"],
    credentials: true,
  })
);
app.use(express.json());
app.use(cookieparser());

// Handle Preflight Requests
app.options("*", cors());

// Routers
app.use("/", authRouter);
app.use("/", profileRouter);
app.use("/", requestRouter);
app.use("/", userRouter);

// Database connection and server start
connectDB()
  .then(() => {
    console.log("Database connection is established..");
    app.listen(PORT, () => {
      console.log("Server is running on ", PORT);
    });
  })
  .catch((error) => {
    console.log("Error occurred while connecting to the database...", error);
  });
