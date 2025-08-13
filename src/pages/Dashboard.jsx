import React from "react";
import Navbar from './navbar';

const Dashboard = () => {
  const history = JSON.parse(localStorage.getItem("quizHistory")) || [];

  return (
    <>
     <Navbar />
    <div className="min-h-screen bg-gradient-to-tr from-purple-900 via-black to-purple-800 text-white p-8">
      <h1 className="text-4xl font-bold mb-6">Quiz Dashboard</h1>
      {history.length === 0 ? (
        <p>No quizzes taken yet.</p>
      ) : (
        <table className="w-full border border-purple-600 rounded-lg overflow-hidden">
          <thead className="bg-purple-800">
            <tr>
              <th className="p-3 border border-purple-600">Date</th>
              <th className="p-3 border border-purple-600">Score</th>
            </tr>
          </thead>
          <tbody>
            {history.map((r, i) => (
              <tr key={i} className="bg-black/50">
                <td className="p-3 border border-purple-600">{r.date}</td>
                <td className="p-3 border border-purple-600">
                  {r.score} / {r.total}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </div>
    </>
  );
};

export default Dashboard;
