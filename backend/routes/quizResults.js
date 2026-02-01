
import express from "express";
import QuizResult from "../models/QuizResult.js";

const router = express.Router();

router.post("/save", async (req, res) => {
  try {
    const { userId, category, score, total } = req.body;
    const result = await QuizResult.create({ userId, category, score, total });
    res.status(201).json({ message: "Score saved successfully!", result });
  } catch (err) {
    res.status(500).json({ message: "Error saving score", error: err.message });
  }
});

router.get("/:userId", async (req, res) => {
  try {
    const results = await QuizResult.find({ userId: req.params.userId })
      .sort({ createdAt: -1 });
    res.json(results);
  } catch (err) {
    res.status(500).json({ message: "Error fetching results", error: err.message });
  }
});

export default router;
