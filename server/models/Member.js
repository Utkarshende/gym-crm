import mongoose from "mongoose";

const memberSchema = new mongoose.Schema(
  {
    name: { type: String, required: true },
    phone: String,
    email: String,
    gender: String,
    age: Number,
    address: String,
    fee: Number,
    plan: {
      type: String,
      default: "monthly",
    },
    status: {
      type: String,
      default: "active",
    },
    weight: String,
    height: String,
    goal: String,
    payments: [
      {
        amount: Number,
        month: String,
        paidOn: {
          type: Date,
          default: Date.now,
        },
      },
    ],
  },
  { timestamps: true }
);

export default mongoose.model("Member", memberSchema);