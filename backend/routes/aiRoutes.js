import express from "express";
import OpenAI from "openai";
import dotenv from "dotenv";

dotenv.config();
const router = express.Router();

// Initialize OpenAI API
const openai = new OpenAI({ apiKey: process.env.OPENAI_API_KEY });

// AI Grading Route
router.post("/grade", async (req, res) => {
  try {
    const { studentAnswer, correctAnswer } = req.body;

    if (!studentAnswer || !correctAnswer) {
      return res.status(400).json({ error: "Both studentAnswer and correctAnswer are required." });
    }

    // Generate AI feedback
    const response = await openai.chat.completions.create({
      model: "gpt-4",
      messages: [
        { role: "system", content: "You are an AI teacher assistant. Grade the student's answer and provide feedback." },
        { role: "user", content: `Student Answer: ${studentAnswer}\nCorrect Answer: ${correctAnswer}\nProvide a grade (out of 10) and feedback.` }
      ],
      max_tokens: 300,
    });

    const aiFeedback = response.choices[0].message.content;

    res.json({ feedback: aiFeedback });
  } catch (error) {
    console.error("AI Grading Error:", error);
    res.status(500).json({ error: "Failed to generate AI feedback." });
  }
});

export default router;
