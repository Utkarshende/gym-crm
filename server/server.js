import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import connectDB from "./config/db.js";

import memberRoutes from "./routes/memberRoutes.js";
import paymentRoutes from "./routes/paymentRoutes.js";
import authRoutes from "./routes/authRoutes.js";

dotenv.config();
connectDB();

const app = express();

app.use(cors({
  origin:[
    "http://localhost:5173",
    "https://gym-crm-backend-yu86.onrender.com"
  ],
  credentials:true,
}));

app.use(express.json());

// Routes
app.use("/api/members", memberRoutes);
app.use("/api/payments", paymentRoutes);
app.use("/api/auth", authRoutes);

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
  console.log(`✅ Server running on port ${PORT}`);
});