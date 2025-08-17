const express = require("express");
const QuizResult = require("../models/QuizResult");

const router = express.Router();

// Save quiz result
router.post("/save", async (req, res) => {
  const { userId, category, score, total } = req.body;
  try {
    const result = new QuizResult({ userId, category, score, total });
    await result.save();
    res.json({ message: "Score saved successfully!" });
  } catch (err) {
    res.status(500).json({ message: "Error saving score", err });
  }
});

// Get all results of a user
router.get("/:userId", async (req, res) => {
  try {
    const results = await QuizResult.find({ userId: req.params.userId });
    res.json(results);
  } catch (err) {
    res.status(500).json({ message: "Error fetching results", err });
  }
});

module.exports = router;
