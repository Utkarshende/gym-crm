import dotenv from "dotenv";
dotenv.config();

import express from "express";
import cors from "cors";
import connectDB from "./config/db.js";

import memberRoutes from "./routes/memberRoutes.js";
import paymentRoutes from "./routes/paymentRoutes.js";
import authRoutes from "./routes/authRoutes.js";

connectDB();

const app = express();

app.use(cors({
  origin: [
    "http://localhost:5173",                    
    "https://sfcgym.netlify.app",                
    "https://gym-crm-backend-yu86.onrender.com"  
  ],
  credentials: true,
  methods: ["GET", "POST", "PUT", "DELETE"],    
  allowedHeaders: ["Content-Type", "Authorization"] 
}));

app.use(express.json());

app.use("/api/members", memberRoutes);
app.use("/api/payments", paymentRoutes);
app.use("/api/auth", authRoutes);

const PORT = process.env.PORT || 5000;

app.listen(PORT, '0.0.0.0', () => {
  console.log(`Server is running on port ${PORT}`);
});