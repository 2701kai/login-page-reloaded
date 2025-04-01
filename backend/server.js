// backend/server.js
import express from "express";
import mongoose from "mongoose";
import cors from "cors";
import dotenv from "dotenv";
import authRoutes from "./src/routes/auth.js";
dotenv.config();
const app = express();

// MongoDB Connection
mongoose
  .connect(process.env.MONGODB_URI)
  .then(() => console.log("✅ Connected to MongoDB"))
  .catch((err) => console.error("❌ MongoDB connection error:", err));

// Middleware
app.use(cors());
app.use(express.json());

// Optional: default route (for sanity test)
app.get("/", (req, res) => {
  res.status(200).json({
    code: 200,
    answer: "Login backend is up ✅",
  });
});

// Routes
app.use("/api/auth", authRoutes);

app.all("*", (req, res) => {
  res.status(404).json({
    code: 404,
    answer: "Endpoint not found",
  });
});

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`🚀 Server running on port ${PORT}`);
});
