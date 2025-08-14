// import React, { useState, useEffect } from "react";
// import Navbar from './navbar';
// const API_KEY = "uIiMj47w76hYMkuQNxgI8o3ie6M8jvAPqEW1BQNk"; // Apni API key yaha daalein

// const categories = [
//   "Linux",
//   "DevOps",
//   "Code",
//   "Docker",
//   "Kubernetes",
//   "JavaScript",
//   "Python",
//   "HTML",
//   "MySQL",
//   "PHP",
// ];

// export default function Quiz() {
//   const [selectedCategory, setSelectedCategory] = useState("");
//   const [quizzes, setQuizzes] = useState([]);
//   const [loading, setLoading] = useState(false);
//   const [selectedAnswers, setSelectedAnswers] = useState({});
//   const [showResults, setShowResults] = useState(false);
//   const [score, setScore] = useState(0);

//   const fetchQuizzes = async (category) => {
//     setLoading(true);
//     setQuizzes([]);
//     setSelectedAnswers({});
//     setShowResults(false);
//     setScore(0);
//     try {
//       const res = await fetch(
//         `https://quizapi.io/api/v1/questions?category=${category}&limit=10`,
//         {
//           headers: {
//             "X-Api-Key": API_KEY,
//           },
//         }
//       );
//       const data = await res.json();
//       setQuizzes(data);
//     } catch (error) {
//       console.error("Error fetching quizzes:", error);
//     }
//     setLoading(false);
//   };

//   useEffect(() => {
//     if (selectedCategory) {
//       fetchQuizzes(selectedCategory);
//     }
//   }, [selectedCategory]);

//   const handleAnswerClick = (quizIndex, answerKey) => {
//     if (!showResults) { // Submit ke baad change na ho
//       setSelectedAnswers((prev) => ({
//         ...prev,
//         [quizIndex]: answerKey,
//       }));
//     }
//   };

//   const handleSubmit = () => {
//     let calculatedScore = 0;
//     quizzes.forEach((quiz, i) => {
//       const selected = selectedAnswers[i];
//       if (selected && quiz.correct_answers[`${selected}_correct`] === "true") {
//         calculatedScore++;
//       }
//     });
//     setScore(calculatedScore);
//     setShowResults(true);
//   };

//   return (
//     <>
//       <Navbar />
//       <div className="min-h-screen bg-gradient-to-tr from-purple-900 via-black to-purple-800 text-white px-6 py-12">
//         <h1 className="text-5xl font-extrabold text-center mb-8">Featured Quizzes</h1>

//         {/* Categories */}
//         <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-5 gap-6 mb-10">
//           {categories.map((cat) => (
//             <button
//               key={cat}
//               onClick={() => setSelectedCategory(cat)}
//               className={`p-4 rounded-xl font-bold transition ${
//                 selectedCategory === cat
//                   ? "bg-purple-700 border border-purple-400"
//                   : "bg-black/50 border border-purple-700 hover:bg-purple-800"
//               }`}
//             >
//               {cat}
//             </button>
//           ))}
//         </div>

//         {/* Loading */}
//         {loading && <p className="text-center text-lg">Loading quizzes...</p>}

//         {/* Quizzes */}
//         {!loading && quizzes.length > 0 && (
//           <div className="space-y-6">
//             {quizzes.map((quiz, i) => (
//               <div
//                 key={i}
//                 className="bg-black/60 p-6 rounded-xl border border-purple-700 shadow-lg"
//               >
//                 <h2 className="text-2xl font-bold mb-4">{quiz.question}</h2>
//                 <ul className="space-y-2">
//                   {Object.entries(quiz.answers)
//                     .filter(([_, value]) => value !== null)
//                     .map(([key, value]) => {
//                       const isSelected = selectedAnswers[i] === key;
//                       const isCorrect = quiz.correct_answers[`${key}_correct`] === "true";

//                       let optionClass = "bg-purple-950/40 border border-purple-700";
//                       if (showResults) {
//                         if (isSelected) {
//                           optionClass = isCorrect
//                             ? "bg-green-700 border-green-500"
//                             : "bg-red-700 border-red-500";
//                         }
//                         if (!isSelected && isCorrect) {
//                           optionClass = "bg-green-700 border-green-500"; // Correct answer highlight
//                         }
//                       } else if (isSelected) {
//                         optionClass = "bg-purple-700 border-purple-500";
//                       }

//                       return (
//                         <li
//                           key={key}
//                           onClick={() => handleAnswerClick(i, key)}
//                           className={`${optionClass} py-2 px-4 rounded-lg cursor-pointer hover:bg-purple-800 transition`}
//                         >
//                           {value}
//                         </li>
//                       );
//                     })}
//                 </ul>
//               </div>
//             ))}
//           </div>
//         )}

//         {/* Submit Button */}
//         {!loading && quizzes.length > 0 && !showResults && (
//           <div className="text-center mt-8">
//             <button
//               onClick={handleSubmit}
//               className="bg-gradient-to-r from-purple-600 to-purple-800 px-6 py-3 rounded-xl font-bold text-white hover:from-purple-700 hover:to-purple-900 transition"
//             >
//               Submit Answers
//             </button>
//           </div>
//         )}

//         {/* Score */}
//         {showResults && (
//           <div className="text-center mt-8">
//             <p className="text-2xl font-bold">Your Score: {score} / {quizzes.length}</p>
//           </div>
//         )}

//         {/* No quizzes */}
//         {!loading && selectedCategory && quizzes.length === 0 && (
//           <p className="text-center text-lg">No quizzes found for this category.</p>
//         )}
//       </div>
//     </>
//   );
// }


// uIiMj47w76hYMkuQNxgI8o3ie6M8jvAPqEW1BQNk

// https://quizapi.io/api/v1/questions



import React, { useState, useEffect } from "react";
import Navbar from './navbar';
import { CircularProgressbar, buildStyles } from "react-circular-progressbar";
import "react-circular-progressbar/dist/styles.css";

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
  const [showResults, setShowResults] = useState(false);
  const [score, setScore] = useState(0);
  // const [timeElapsed, setTimeElapsed] = useState(0);
  const [timeLeft, setTimeLeft] = useState(300); // 5 min in seconds


  const fetchQuizzes = async (category) => {
    setLoading(true);
    setQuizzes([]);
    setSelectedAnswers({});
    setShowResults(false);
    setScore(0);
    setTimeElapsed(0);
    try {
      const res = await fetch(
        `https://quizapi.io/api/v1/questions?category=${category}&limit=5`,
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

  // Timer
  useEffect(() => {
  let timer;
  if (quizzes.length > 0 && !showResults) {
    timer = setInterval(() => {
      setTimeLeft((prev) => {
        if (prev <= 1) {
          clearInterval(timer);
          handleSubmit(); // Auto-submit when time ends
          return 0;
        }
        return prev - 1;
      });
    }, 1000);
  }
  return () => clearInterval(timer);
}, [quizzes, showResults]);


  const handleSubmit = () => {
    let calculatedScore = 0;
    quizzes.forEach((quiz, i) => {
      const selected = selectedAnswers[i];
      if (selected && quiz.correct_answers[`${selected}_correct`] === "true") {
        calculatedScore++;
      }
    });
    setScore(calculatedScore);
    setShowResults(true);
  };

  const correctCount = score;
  const incorrectCount = Object.keys(selectedAnswers).length - score;

  return (
    <>
      <Navbar />
      <div className="min-h-screen bg-gradient-to-tr from-purple-900 via-black to-purple-800 text-white px-6 py-12">
        <h1 className="text-5xl font-extrabold text-center mb-8 mt-10">Featured Quizzes</h1>

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

        {/* Timer */}
{quizzes.length > 0 && !showResults && (
  <div className="text-center mb-6 text-lg font-semibold">
    Time Left: {formatTime(timeElapsed)}
  </div>
)}


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
                      const isCorrect =
                        quiz.correct_answers[`${key}_correct`] === "true";

                      let optionClass =
                        "bg-purple-950/40 border border-purple-700";
                      if (showResults) {
                        if (isSelected) {
                          optionClass = isCorrect
                            ? "bg-green-700 border-green-500"
                            : "bg-red-700 border-red-500";
                        }
                        if (!isSelected && isCorrect) {
                          optionClass = "bg-green-700 border-green-500";
                        }
                      } else if (isSelected) {
                        optionClass = "bg-purple-700 border-purple-500";
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

        {/* Submit Button */}
        {!loading && quizzes.length > 0 && !showResults && (
          <div className="text-center mt-8">
            <button
              onClick={handleSubmit}
              className="bg-gradient-to-r from-purple-600 to-purple-800 px-6 py-3 rounded-xl font-bold text-white hover:from-purple-700 hover:to-purple-900 transition"
            >
              Submit Answers
            </button>
          </div>
        )}

        {/* Results */}
        {showResults && (
          <div className="mt-10 bg-black/50 p-8 rounded-2xl border border-purple-600 shadow-lg max-w-2xl mx-auto">
            <div className="flex flex-col md:flex-row items-center justify-around">
              {/* Score Circle */}
              <div className="w-40 h-40 mb-6 md:mb-0">
                <CircularProgressbar
                  value={(score / quizzes.length) * 100}
                  text={`${Math.round((score / quizzes.length) * 100)}%`}
                  styles={buildStyles({
                    textColor: "#fff",
                    pathColor: "#a855f7",
                    trailColor: "#2d1b4e",
                  })}
                />
              </div>

              {/* Details */}
              <div className="text-center md:text-left">
                <h2 className="text-2xl font-bold mb-2">Your Results</h2>
                <p className="text-lg mb-2">Points: {score} / {quizzes.length}</p>
                <p className="text-lg mb-2">Duration: {formatTime(timeElapsed)}</p>
                <div className="flex gap-4 mt-4 justify-center md:justify-start">
                  <span className="px-3 py-1 bg-green-700 rounded-lg">Correct: {correctCount}</span>
                  <span className="px-3 py-1 bg-red-700 rounded-lg">Incorrect: {incorrectCount}</span>
                </div>
              </div>
            </div>
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
