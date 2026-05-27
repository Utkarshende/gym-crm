import express from "express";
import { GoogleGenerativeAI } from "@google/generative-ai";

const router = express.Router();

if (!process.env.GEMINI_API_KEY) {
  console.error("Missing GEMINI_API_KEY environment variable");
}

const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY);

router.post("/workout-plan", async (req, res) => {
  try {
    const { age, weight, height, gender, goal } = req.body;

    if (!age || !weight || !height || !gender || !goal) {
      return res.status(400).json({
        success: false,
        message: "Missing required fields: age, weight, height, gender, and goal are all required.",
      });
    }

    const model = genAI.getGenerativeModel({
      model: "gemini-1.5-flash",
      generationConfig: { responseMimeType: "application/json" }
    });
    const prompt = `
      Create a professional gym workout and diet plan based on these metrics:
      Age: ${age}
      Weight: ${weight}kg
      Height: ${height}cm
      Gender: ${gender}
      Goal: ${goal}

      Return the data strictly in the following JSON format:
      {
        "weeklyWorkoutSplit": {},
        "dietRecommendation": [],
        "targetCalories": "",
        "tips": []
      }
    `;

    const result = await model.generateContent(prompt);
    const responseText = result.response.text();

    const cleanPlan = JSON.parse(responseText);

    res.json({
      success: true,
      plan: cleanPlan,
    });

  } catch (error) {
    console.error("Gemini API Error:", error); 
    
    res.status(500).json({
      success: false,
      message: "An error occurred while generating your workout plan.",
      error: error.message 
    });
  }
});

export default router;