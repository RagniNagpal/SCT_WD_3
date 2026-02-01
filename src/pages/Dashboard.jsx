
import React, { useEffect, useState } from "react";
import Navbar from "./navbar";

export default function Dashboard() {
  const [results, setResults] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const user = JSON.parse(localStorage.getItem("user"));
    if (!user?._id) {
      window.location.href = "/login";
      return;
    }

    fetch(`http://localhost:5000/api/quiz-results/${user._id}`, {
      credentials: "include",
    })
      .then((res) => res.json())
      .then((data) => setResults(data))
      .finally(() => setLoading(false));
  }, []);

  return (
    <>
      <Navbar />
      <div className="min-h-screen p-8 bg-gradient-to-tr from-purple-900 via-black to-purple-800 text-white">
        <h1 className="text-3xl font-bold mb-6 text-center">Dashboard</h1>

        {loading && <p>Loading...</p>}

        {!loading && results.length === 0 && (
          <p className="text-center text-purple-300">
            You haven’t attempted any quizzes yet.
          </p>
        )}

        <div className="space-y-4">
          {results.map((r) => (
            <div key={r._id} className="bg-black/60 p-4 rounded-xl">
              <p><b>Category:</b> {r.category}</p>
              <p><b>Score:</b> {r.score} / {r.total}</p>
              <p className="text-sm text-purple-400">
                {new Date(r.createdAt).toLocaleString()}
              </p>
            </div>
          ))}
        </div>
      </div>
    </>
  );
}

