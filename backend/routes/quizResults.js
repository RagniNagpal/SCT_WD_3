const express = require("express");
const router = express.Router();
const QuizResult = require("../models/QuizResult");

// POST /api/quiz-results/save  -> save a result
router.post("/save", async (req, res) => {
  try {
    const { userId, category, score, total } = req.body;

    if (!userId || !category || score === undefined || total === undefined) {
      return res.status(400).json({ message: "userId, category, score, total required" });
    }

    const result = new QuizResult({ userId, category, score, total });
    await result.save();

    res.status(201).json({ message: "Score saved successfully!", result });
  } catch (err) {
    console.error("save error:", err);
    res.status(500).json({ message: "Error saving score", error: err.message });
  }
});

// GET /api/quiz-results/:userId  -> list results for a user
router.get("/:userId", async (req, res) => {
  try {
    const results = await QuizResult.find({ userId: req.params.userId })
      .sort({ createdAt: -1 });
    res.json(results);
  } catch (err) {
    console.error("fetch error:", err);
    res.status(500).json({ message: "Error fetching results", error: err.message });
  }
});

module.exports = router;
