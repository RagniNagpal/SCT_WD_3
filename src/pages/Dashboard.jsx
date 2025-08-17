import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

export default function Dashboard() {
  const [results, setResults] = useState([]);
  const [user, setUser] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    // ✅ Get logged in user from localStorage
    const storedUser = JSON.parse(localStorage.getItem("user"));
    setUser(storedUser);

    if (!storedUser) {
      // ❌ Agar login nahi hai toh login page pe bhejo
      navigate("/login");
      return;
    }

    const fetchResults = async () => {
      try {
        const res = await fetch(
          `http://localhost:5000/api/quiz-results/${storedUser._id}`, // ✅ _id use karo
          { credentials: "include" }
        );

        if (!res.ok) {
          throw new Error("Failed to fetch quiz results");
        }

        const data = await res.json();
        console.log("✅ Fetched quiz results:", data);
        setResults(data || []);
      } catch (err) {
        console.error("❌ Error fetching results:", err.message);
      }
    };

    fetchResults();
  }, [navigate]);

  return (
    <div className="p-8 min-h-screen bg-gradient-to-tr from-purple-900 via-black to-purple-800 text-white">
      <h1 className="text-4xl font-extrabold mb-8 text-center">
        Your Quiz Dashboard
      </h1>

      {!user ? (
        <p className="text-center text-lg text-purple-300">
          Please login to see your dashboard.
        </p>
      ) : results.length === 0 ? (
        <p className="text-center text-lg text-purple-300">
          No quiz attempts yet.
        </p>
      ) : (
        <div className="space-y-4">
          {results.map((r, i) => (
            <div
              key={i}
              className="p-5 rounded-2xl bg-black/60 border border-purple-700 shadow-md hover:shadow-purple-800 transition"
            >
              <p className="text-lg">
                <span className="font-semibold">Category:</span> {r.category}
              </p>
              <p className="text-lg">
                <span className="font-semibold">Score:</span> {r.score} /{" "}
                {r.total}
              </p>
              <p className="text-sm text-purple-400">
                {new Date(r.date).toLocaleString()}
              </p>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
