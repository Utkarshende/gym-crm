import express from "express";

import {
  getMembers,
  addMember,
  getMemberById,
  updateMember,
  deleteMember,
} from "../controllers/memberController.js";

import authMiddleware from "../middleware/authMiddleware.js";

const router = express.Router();


// PROTECT ALL ROUTES
router.use(authMiddleware);


// ROUTES
router.get("/", getMembers);

router.post("/", addMember);

router.get("/:id", getMemberById);

router.put("/:id", updateMember);

router.delete("/:id", deleteMember);

export default router;