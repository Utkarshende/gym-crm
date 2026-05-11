import mongoose from "mongoose";

const attendanceSchema = new mongoose.Schema(
  {
    memberId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Member",
      required: true,
    },

    adminId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Admin",
      required: true,
    },

    date: {
      type: String,
      required: true,
    },

    status: {
      type: String,
      enum: ["present", "absent"],
      default: "present",
    },

    checkInTime: {
      type: String,
    },
  },
  { timestamps: true }
);

export default mongoose.model(
  "Attendance",
  attendanceSchema
);