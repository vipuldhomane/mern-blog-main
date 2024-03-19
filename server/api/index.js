import express from "express";
import mongoose from "mongoose";
import dotenv from "dotenv";
import path from "path";
import cookieParser from "cookie-parser";
import userRoutes from "./routes/user.route.js";
import authRoutes from "./routes/auth.route.js";
import postRoutes from "./routes/post.route.js";
import commentRoutes from "./routes/comment.route.js";
import morgan from "morgan";
import cors from "cors";
dotenv.config();

mongoose
  .connect(process.env.MONGO)
  .then(() => {
    console.log("MongoDb is connected");
  })
  .catch((err) => {
    console.log(err);
  });

const __dirname = path.resolve();

const app = express();

const allowedOrigins = [
  "https://mern-blog-main-ruby.vercel.app",
  "http://localhost:5371",
  "https://telzonsite.vercel.app",
];
app.use(
  cors({
    // origin: "*",
    origin: allowedOrigins,
    credentials: true, // Allow cookies to be sent with cross-origin requests
  })
);

app.use(morgan("combined"));
app.use(express.json());
app.use(cookieParser());

app.listen(8000, () => {
  console.log("Server is running on port 8000!");
});

app.use("/api/user", userRoutes);
app.use("/api/auth", authRoutes);
app.use("/api/post", postRoutes);
app.use("/api/comment", commentRoutes);

app.use(express.static(path.join(__dirname, "/client/dist")));

app.get("*", (req, res) => {
  // res.sendFile(path.join(__dirname, "client", "dist", "index.html"));
  res.json({ message: "Not a valid Path" });
});

// Set up Morgan logging middleware

app.use((err, req, res, next) => {
  const statusCode = err.statusCode || 500;
  const message = err.message || "Internal Server Error";
  res.status(statusCode).json({
    success: false,
    statusCode,
    message,
  });
});
