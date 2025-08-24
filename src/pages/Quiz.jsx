import React, { useState, useEffect } from "react";
import Navbar from "./navbar";

const API_KEY = import.meta.env.VITE_API_KEY;
console.log("API Key:", import.meta.env.VITE_API_KEY);


const categories = ["Linux", "DevOps", "Code", "Docker", "JavaScript", "HTML"];

export default function Quiz() {
  const [selectedCategory, setSelectedCategory] = useState("");
  const [quizzes, setQuizzes] = useState([]);
  const [loading, setLoading] = useState(false);
  const [selectedAnswers, setSelectedAnswers] = useState({});
  const [showResults, setShowResults] = useState(false);
  const [score, setScore] = useState(0);

  const fetchQuizzes = async (category) => {
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
      setQuizzes(data);
    } catch (error) {
      console.error("Error fetching quizzes:", error);
    }
    setLoading(false);
  };

  useEffect(() => {
    if (selectedCategory) fetchQuizzes(selectedCategory);
  }, [selectedCategory]);

  const handleAnswerClick = (quizIndex, answerKey) => {
    if (!showResults) {
      setSelectedAnswers((prev) => ({ ...prev, [quizIndex]: answerKey }));
    }
  };

  const handleSubmit = async () => {
    let calculatedScore = 0;
    quizzes.forEach((quiz, i) => {
      const selected = selectedAnswers[i];
      if (selected && quiz.correct_answers?.[`${selected}_correct`] === "true") {
        calculatedScore++;
      }
    });

    setScore(calculatedScore);
    setShowResults(true);

    const storedUser = JSON.parse(localStorage.getItem("user"));
    if (!storedUser?._id) {
      alert("Please login first");
      return;
    }

    try {
      const res = await fetch("http://localhost:5000/api/quiz-results/save", {
  method: "POST",
  headers: { "Content-Type": "application/json" },
  body: JSON.stringify({
    userId: storedUser._id,
    category: selectedCategory,
    score: calculatedScore,
    total: quizzes.length,
  }),
  credentials: "include",  
});

      const data = await res.json();
      if (!res.ok) throw new Error(data.message || "Save failed");
      console.log("✅ Score saved:", data);
    } catch (err) {
      console.error("❌ Error saving score:", err.message);
      alert("Score save failed: " + err.message);
    }
  };

  return (
    <>
      <Navbar />
      <div className="p-6 text-white">
        <h1 className="text-3xl font-bold mb-4">Featured Quizzes</h1>

        <div className="flex gap-2 mb-6">
          {categories.map((cat) => (
            <button
              key={cat}
              onClick={() => setSelectedCategory(cat)}
              className={`px-3 py-2 rounded ${selectedCategory === cat ? "bg-purple-700" : "bg-purple-900"}`}
            >
              {cat}
            </button>
          ))}
        </div>

        {loading && <p>Loading quizzes...</p>}

        {!loading && quizzes.length > 0 && (
          <div className="space-y-4">
            {quizzes.map((quiz, i) => (
              <div key={i} className="bg-gray-900/70 p-4 rounded-xl border border-blue-500">
                <h2 className="text-xl font-semibold mb-2">{quiz.question}</h2>
                <ul className="space-y-2">
                  {Object.entries(quiz.answers || {})
                    .filter(([, v]) => v)
                    .map(([key, value]) => {
                      const isSelected = selectedAnswers[i] === key;
                      const isCorrect = quiz.correct_answers?.[`${key}_correct`] === "true";

                      let cls = "bg-purple-950/40 border border-purple-700";
                      if (showResults) {
                        if (isSelected) cls = isCorrect ? "bg-green-700 border-green-500" : "bg-red-700 border-red-500";
                        if (!isSelected && isCorrect) cls = "bg-green-700 border-green-500";
                      } else if (isSelected) {
                        cls = "bg-purple-700 border-purple-500";
                      }

                      return (
                        <li
                          key={key}
                          onClick={() => handleAnswerClick(i, key)}
                          className={`${cls} py-2 px-3 rounded cursor-pointer`}
                        >
                          {value}
                        </li>
                      );
                    })}
                </ul>
              </div>
            ))}
          </div>
        )}

        {!loading && quizzes.length > 0 && !showResults && (
          <div className="mt-6">
            <button onClick={handleSubmit} className="bg-purple-700 px-4 py-2 rounded">
              Submit Answers
            </button>
          </div>
        )}

        {showResults && (
          <div className="mt-6">
            <p className="text-2xl font-bold">Your Score: {score} / {quizzes.length}</p>
          </div>
        )}
      </div>
    </>
  );
}
