import Admin from "../models/Admin.js";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";

const generateToken = (id) => {
  return jwt.sign({ id }, process.env.JWT_SECRET, {
    expiresIn: "7d",
  });
};

export const registerAdmin = async (req, res) => {
  try {
    const { email, password } = req.body;

    const exists = await Admin.findOne({ email });

    if (exists) {
      return res.status(400).json({
        message: "Admin already exists",
      });
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    const admin = await Admin.create({
      email,
      password: hashedPassword,
    });

    res.status(201).json({
      token: generateToken(admin._id),
    });
  } catch (error) {
    res.status(500).json({
      message: error.message,
    });
  }
};

export const loginAdmin = async (req, res) => {
  try {
    const { email, password } = req.body;

    const admin = await Admin.findOne({ email });

    if (!admin) {
      return res.status(400).json({
        message: "Admin not found",
      });
    }

    const match = await bcrypt.compare(
      password,
      admin.password
    );

    if (!match) {
      return res.status(400).json({
        message: "Wrong password",
      });
    }

    res.json({
      token: generateToken(admin._id),
    });
  } catch (error) {
    res.status(500).json({
      message: error.message,
    });
  }
};