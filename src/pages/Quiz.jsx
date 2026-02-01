

import { useNavigate } from "react-router-dom";
import React, { useState, useEffect } from "react";
import Navbar from "./navbar";
import emailjs from "@emailjs/browser";
import { toast } from "react-toastify";

const API_KEY = import.meta.env.VITE_API_KEY;
const categories = ["Linux", "DevOps", "Code", "Docker", "JavaScript", "HTML"];

export default function Quiz() {
  const [selectedCategory, setSelectedCategory] = useState("");
  const [quizzes, setQuizzes] = useState([]);
  const [loading, setLoading] = useState(false);
  const [selectedAnswers, setSelectedAnswers] = useState({});
  const [showResults, setShowResults] = useState(false);
  const [score, setScore] = useState(0);

  const navigate = useNavigate();

  // ✅ Login check + redirect
  useEffect(() => {
    const user = JSON.parse(localStorage.getItem("user"));
    if (!user?._id) {
      toast.error("Please login first");
      navigate("/login", { replace: true });
    }
  }, [navigate]);

  // Fetch quizzes
  const fetchQuizzes = async (category) => {
    const user = JSON.parse(localStorage.getItem("user"));
    if (!user?._id) return;

    setLoading(true);
    setQuizzes([]);
    setSelectedAnswers({});
    setShowResults(false);
    setScore(0);

    try {
      const res = await fetch(
        `https://quizapi.io/api/v1/questions?category=${category}&limit=5`,
        { headers: { "X-Api-Key": API_KEY } }
      );
      const data = await res.json();
      if (!Array.isArray(data)) {
    toast.error("No quizzes found for this category");
    setQuizzes([]);
    setLoading(false);
    return;   
  }
      setQuizzes(data);
    } catch (err) {
      toast.error("Failed to load quizzes");
    }
    setLoading(false);
  };

  useEffect(() => {
    if (selectedCategory) fetchQuizzes(selectedCategory);
  }, [selectedCategory]);

  // EmailJS function
  const sendScoreEmail = async ({ name, email, score, total, quiz_title, result }) => {
    try {
      await emailjs.send(
        import.meta.env.VITE_EMAILJS_SERVICE_ID,
        import.meta.env.VITE_EMAILJS_TEMPLATE_ID,
        { name, email, score, total, quiz_title, result },
        import.meta.env.VITE_EMAILJS_PUBLIC_KEY
      );
      toast.success("📩 Quiz result sent!");
    } catch (err) {
      toast.error("Email send failed");
    }
  };

  // Handle answer selection
  const handleAnswerClick = (quizIndex, answerKey) => {
    if (!showResults) setSelectedAnswers({ ...selectedAnswers, [quizIndex]: answerKey });
  };

  // Handle quiz submission
  const handleSubmit = async () => {
    const user = JSON.parse(localStorage.getItem("user"));
    if (!user?._id) return toast.error("Login first");

    let calculatedScore = 0;
    quizzes.forEach((q, i) => {
      const sel = selectedAnswers[i];
      if (sel && q.correct_answers?.[`${sel}_correct`] === "true") calculatedScore++;
    });

    setScore(calculatedScore);
    setShowResults(true);

    // Send Email
    await sendScoreEmail({
      name: user.username,
      email: user.email,
      score: calculatedScore,
      total: quizzes.length,
      quiz_title: selectedCategory,
      result: calculatedScore >= quizzes.length / 2 ? "Pass ✅" : "Fail ❌",
    });

    // Save to backend
    try {
      const res = await fetch("http://localhost:5000/api/quiz-results/save", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        credentials: "include",
        body: JSON.stringify({
          userId: user._id,
          category: selectedCategory,
          score: calculatedScore,
          total: quizzes.length,
        }),
      });

      if (res.status === 401) {
        toast.error("Session expired, please login again");
        localStorage.removeItem("user");
        navigate("/login", { replace: true });
        return;
      }

      if (!res.ok) throw new Error("Save failed");
      toast.success("✅ Score saved");
    } catch (err) {
      toast.error("❌ Score save failed");
    }
  };

  return (
    <>
      <Navbar />
      <div className="p-6 min-h-screen bg-gradient-to-r from-purple-800 via-black to-indigo-900 text-white">
        <h1 className="text-3xl font-bold mb-4">Quizzes</h1>

        <div className="flex gap-2 mb-6">
          {categories.map((cat) => (
            <button
              key={cat}
              onClick={() => setSelectedCategory(cat)}
              className={`px-3 py-2 rounded ${
                selectedCategory === cat ? "bg-purple-700" : "bg-purple-900"
              } hover:bg-purple-600`}
            >
              {cat}
            </button>
          ))}
        </div>

        {loading && <p>Loading quizzes...</p>}

        {quizzes.map((q, i) => (
          <div key={i} className="bg-gray-900/70 p-4 rounded-xl mb-4">
            <h2 className="font-semibold mb-2">{q.question}</h2>
            <ul className="space-y-2">
              {Object.entries(q.answers || {})
                .filter(([k, v]) => v)
                .map(([k, v]) => {
                  const isSelected = selectedAnswers[i] === k;
                  const isCorrect = q.correct_answers?.[`${k}_correct`] === "true";

                  let cls = "bg-purple-950/40 border border-purple-700";
                  if (showResults)
                    cls = isSelected
                      ? isCorrect
                        ? "bg-green-700 border-green-500"
                        : "bg-red-700 border-red-500"
                      : isCorrect
                      ? "bg-green-700 border-green-500"
                      : cls;
                  else if (isSelected) cls = "bg-purple-700 border-purple-500";

                  return (
                    <li
                      key={k}
                      onClick={() => handleAnswerClick(i, k)}
                      className={`${cls} py-2 px-3 rounded cursor-pointer`}
                    >
                      {v}
                    </li>
                  );
                })}
            </ul>
          </div>
        ))}

        {quizzes.length > 0 && !showResults && (
          <button onClick={handleSubmit} className="bg-purple-700 px-6 py-2 rounded">
            Submit Answers
          </button>
        )}

        {showResults && (
          <p className="text-2xl font-bold mt-6">
            Score: {score} / {quizzes.length}
          </p>
        )}
      </div>
    </>
  );
}
