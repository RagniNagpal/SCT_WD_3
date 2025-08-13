import React from "react";
import { useLocation, Link } from "react-router-dom";
import Navbar from "./navbar";

const Result = () => {
  const { state } = useLocation();

  if (!state) return <p className="text-center text-white">No result data.</p>;

  return (
    <>
    <Navbar />
    <div className="min-h-screen flex flex-col items-center justify-center bg-gradient-to-tr from-purple-900 via-black to-purple-800 text-white">
      <h1 className="text-4xl font-bold mb-4">Your Score</h1>
      <p className="text-2xl mb-6">
        {state.score} / {state.total}
      </p>
      <Link
        to="/dashboard"
        className="bg-purple-700 px-6 py-3 rounded-lg text-xl font-semibold hover:bg-purple-900 transition"
      >
        View Dashboard
      </Link>
    </div>
    </>
  );
};

export default Result;
