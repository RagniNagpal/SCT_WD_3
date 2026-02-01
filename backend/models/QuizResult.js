import mongoose from "mongoose";

const QuizResultSchema = new mongoose.Schema(
  {
    userId: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true },
    category: { type: String, required: true },
    score: { type: Number, required: true },
    total: { type: Number, required: true }
  },
  { timestamps: true }
);

export default mongoose.model("QuizResult", QuizResultSchema);
