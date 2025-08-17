const mongoose = require("mongoose");

const QuizResultSchema = new mongoose.Schema({
  userId: { type: String, required: true },
  category: { type: String, required: true },
  score: { type: Number, required: true },
  total: { type: Number, required: true },
  date: { type: Date, default: Date.now }
});

module.exports = mongoose.model("QuizResult", QuizResultSchema);
