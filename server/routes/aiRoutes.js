import express from "express";
import { GoogleGenerativeAI } from "@google/generative-ai";

const router = express.Router();

const genAI = new GoogleGenerativeAI(
  process.env.GEMINI_API_KEY
);

router.post("/workout-plan", async (req, res) => {
  try {

    const {
      age,
      weight,
      height,
      goal,
      gender
    } = req.body;

    const model = genAI.getGenerativeModel({
      model: "gemini-1.5-flash",
    });

    const prompt = `
      Create a gym workout and diet plan.

      Age: ${age}
      Weight: ${weight}kg
      Height: ${height}cm
      Gender: ${gender}
      Goal: ${goal}

      Give:
      1. Weekly workout plan
      2. Diet recommendation
      3. Calories
      4. Tips
    `;

    const result = await model.generateContent(prompt);

    const response =
      result.response.text();

    res.json({
      success: true,
      plan: response,
    });

  } catch (error) {

    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
});

export default router;