import express from "express";
import Attendance from "../models/Attendance.js";
import Member from "../models/Member.js";
import authMiddleware from "../middleware/authMiddleware.js";

const router = express.Router();

router.use(authMiddleware);


router.get("/",(req,res)=>{
  res.json({    message:"Attendance route working"
  })
});

/* MARK ATTENDANCE */
router.post("/mark", async (req, res) => {
  try {
    const { memberId, status } = req.body;

    const today = new Date().toISOString().split("T")[0];

    const existing = await Attendance.findOne({
      memberId,
      date: today,
      adminId: req.user.id,
    });

    if (existing) {
      return res.status(400).json({
        message: "Attendance already marked today",
      });
    }

    const attendance = await Attendance.create({
      memberId,
      adminId: req.user.id,
      date: today,
      status,
      checkInTime: new Date().toLocaleTimeString(),
    });

    res.status(201).json(attendance);

  } catch (error) {
    res.status(500).json({
      message: error.message,
    });
  }
});

/* TODAY ATTENDANCE */
router.get("/today", async (req, res) => {
  try {
    const today = new Date().toISOString().split("T")[0];

    const attendance = await Attendance.find({
      date: today,
      adminId: req.user.id,
    }).populate("memberId");

    res.json(attendance);

  } catch (error) {
    res.status(500).json({
      message: error.message,
    });
  }
});

/* MEMBER HISTORY */
router.get("/member/:id", async (req, res) => {
  try {
    const attendance = await Attendance.find({
      memberId: req.params.id,
      adminId: req.user.id,
    }).sort({ createdAt: -1 });

    res.json(attendance);

  } catch (error) {
    res.status(500).json({
      message: error.message,
    });
  }
});

export default router;