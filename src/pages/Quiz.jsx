import React, { useState, useEffect } from "react";
import Navbar from './navbar'
const API_KEY = "uIiMj47w76hYMkuQNxgI8o3ie6M8jvAPqEW1BQNk"; // Apni API key yaha daalein

const categories = [
  "Linux",
  "DevOps",
  "Code",
  "Docker",
  "Kubernetes",
  "JavaScript",
  "Python",
  "HTML",
  "MySQL",
  "PHP",
];

export default function Quiz() {
  const [selectedCategory, setSelectedCategory] = useState("");
  const [quizzes, setQuizzes] = useState([]);
  const [loading, setLoading] = useState(false);
  const [selectedAnswers, setSelectedAnswers] = useState({});

  const fetchQuizzes = async (category) => {
    setLoading(true);
    setQuizzes([]);
    setSelectedAnswers({});
    try {
      const res = await fetch(
        `https://quizapi.io/api/v1/questions?category=${category}&limit=10`,
        {
          headers: {
            "X-Api-Key": API_KEY,
          },
        }
      );
      const data = await res.json();
      setQuizzes(data);
    } catch (error) {
      console.error("Error fetching quizzes:", error);
    }
    setLoading(false);
  };

  useEffect(() => {
    if (selectedCategory) {
      fetchQuizzes(selectedCategory);
    }
  }, [selectedCategory]);

  const handleAnswerClick = (quizIndex, answerKey) => {
    setSelectedAnswers((prev) => ({
      ...prev,
      [quizIndex]: answerKey,
    }));
  };

  return (
    <>
    <Navbar />
    <div className="min-h-screen bg-gradient-to-tr from-purple-900 via-black to-purple-800 text-white px-6 py-12">
      <h1 className="text-5xl font-extrabold text-center mb-8">Featured Quizzes</h1>

      {/* Categories */}
      <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-5 gap-6 mb-10">
        {categories.map((cat) => (
          <button
            key={cat}
            onClick={() => setSelectedCategory(cat)}
            className={`p-4 rounded-xl font-bold transition ${
              selectedCategory === cat
                ? "bg-purple-700 border border-purple-400"
                : "bg-black/50 border border-purple-700 hover:bg-purple-800"
            }`}
          >
            {cat}
          </button>
        ))}
      </div>

      {/* Loading */}
      {loading && <p className="text-center text-lg">Loading quizzes...</p>}

      {/* Quizzes */}
      {!loading && quizzes.length > 0 && (
        <div className="space-y-6">
          {quizzes.map((quiz, i) => (
            <div
              key={i}
              className="bg-black/60 p-6 rounded-xl border border-purple-700 shadow-lg"
            >
              <h2 className="text-2xl font-bold mb-4">{quiz.question}</h2>
              <ul className="space-y-2">
                {Object.entries(quiz.answers)
                  .filter(([_, value]) => value !== null)
                  .map(([key, value]) => {
                    const isSelected = selectedAnswers[i] === key;
                    const isCorrect = quiz.correct_answers[`${key}_correct`] === "true";

                    let optionClass = "bg-purple-950/40 border border-purple-700";
                    if (isSelected) {
                      optionClass = isCorrect
                        ? "bg-green-700 border-green-500"
                        : "bg-red-700 border-red-500";
                    }

                    return (
                      <li
                        key={key}
                        onClick={() => handleAnswerClick(i, key)}
                        className={`${optionClass} py-2 px-4 rounded-lg cursor-pointer hover:bg-purple-800 transition`}
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

      {/* No quizzes */}
      {!loading && selectedCategory && quizzes.length === 0 && (
        <p className="text-center text-lg">No quizzes found for this category.</p>
      )}
    </div>
    </>
  );
}


// uIiMj47w76hYMkuQNxgI8o3ie6M8jvAPqEW1BQNk

// https://quizapi.io/api/v1/questions

