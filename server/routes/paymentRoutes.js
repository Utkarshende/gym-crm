import express from "express";
import {
  markPaid,
  getPendingMembers,
  monthlyRevenue,
} from "../controllers/paymentController.js";

const router = express.Router();

// ✅ Routes

// Mark payment
router.post("/:id/pay", markPaid);

// Get pending members
router.get("/pending/list", getPendingMembers);

// Get monthly revenue
router.get("/revenue/month", monthlyRevenue);

export default router;