import express from "express";
import {
  markPaid,
  getPendingMembers,
  monthlyRevenue,
} from "../controllers/paymentController.js";

const router = express.Router();

router.post("/:id/pay", markPaid);

router.get("/pending/list", getPendingMembers);

router.get("/revenue/month", monthlyRevenue);

export default router;