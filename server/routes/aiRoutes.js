import express from "express";
import { GoogleGenerativeAI } from "@google/generative-ai";

const router = express.Router();

// Ensure the API key exists on startup
if (!process.env.GEMINI_API_KEY) {
  console.error("Missing GEMINI_API_KEY environment variable");
}

const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY);

router.post("/workout-plan", async (req, res) => {
  try {
    const { age, weight, height, gender, goal } = req.body;

    // 1. Basic Validation
    if (!age || !weight || !height || !gender || !goal) {
      return res.status(400).json({
        success: false,
        message: "Missing required fields: age, weight, height, gender, and goal are all required.",
      });
    }

    // 2. Initialize Model (Using 1.5-flash as you requested)
    const model = genAI.getGenerativeModel({
      model: "gemini-1.5-flash",
      // Optional: Force the model to reply strictly in JSON format
      generationConfig: { responseMimeType: "application/json" }
    });

    // 3. Refined Prompt for Structured JSON
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

    // 4. Generate Content
    const result = await model.generateContent(prompt);
    const responseText = result.response.text();

    // 5. Parse the JSON response from Gemini
    const cleanPlan = JSON.parse(responseText);

    res.json({
      success: true,
      plan: cleanPlan,
    });

  } catch (error) {
    console.error("Gemini API Error:", error); // Log locally for debugging
    
    res.status(500).json({
      success: false,
      message: "An error occurred while generating your workout plan.",
      error: error.message // Remove this line in production so users don't see raw stack traces
    });
  }
});

export default router;