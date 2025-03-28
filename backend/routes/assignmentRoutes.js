import express from "express";
import multer from "multer";
import { analyzeAssignment } from "../services/aiService.js";

const router = express.Router();
const upload = multer({ dest: "uploads/" }); // Temporary storage for uploaded files

// Upload Assignment
router.post("/upload", upload.single("assignment"), async (req, res) => {
  try {
    const { path, originalname } = req.file;

    // Simulate AI grading
    const feedback = await analyzeAssignment(path);

    // Save feedback to database (mocked for now)
    const savedFeedback = {
      id: Date.now(),
      assignmentTitle: originalname,
      score: feedback.score,
      comments: feedback.comments,
    };

    res.status(200).json(savedFeedback);
  } catch (error) {
    console.error("Error processing assignment:", error);
    res.status(500).json({ error: "Failed to process assignment." });
  }
});

export default router;
