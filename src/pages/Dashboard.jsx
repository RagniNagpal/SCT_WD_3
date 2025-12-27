// import React, { useEffect, useState } from "react";
// import Navbar from "./navbar";

// export default function Dashboard() {
//   const [results, setResults] = useState([]);
//   const [user, setUser] = useState(null);
//   const [loading, setLoading] = useState(true);

//   useEffect(() => {
//     const stored = JSON.parse(localStorage.getItem("user"));
//     setUser(stored);
//     if (!stored?._id) {
//       window.location.href = "/login";
//       return;
//     }

//     const load = async () => {
//       try {
//         const res = await fetch(`http://localhost:5000/api/quiz-results/${stored._id}`, {
//           credentials: "include",
//         });
//         const data = await res.json();
//         setResults(Array.isArray(data) ? data : []);
//       } catch (e) {
//         console.error("fetch error:", e);
//       } finally {
//         setLoading(false);
//       }
//     };
//     load();
//   }, []);

//   return (
//     <>
//       <Navbar />
//       <div className="p-8 min-h-screen bg-gradient-to-tr from-purple-900 via-black to-purple-800 text-white">
//         <h1 className="text-4xl font-extrabold mb-8 text-center">Your Quiz Dashboard</h1>

//         {!user ? (
//           <p className="text-center text-lg text-purple-300">Please login to see your dashboard.</p>
//         ) : loading ? (
//           <p className="text-center text-lg text-purple-300">Loading...</p>
//         ) : results.length === 0 ? (
//           <p className="text-center text-lg text-purple-300">No quiz attempts yet.</p>
//         ) : (
//           <div className="space-y-4">
//             {results.map((r) => (
//               <div key={r._id} className="p-5 rounded-2xl bg-black/60 border border-purple-700 shadow-md">
//                 <p className="text-lg"><span className="font-semibold">Category:</span> {r.category}</p>
//                 <p className="text-lg"><span className="font-semibold">Score:</span> {r.score} / {r.total}</p>
//                 <p className="text-sm text-purple-400">{new Date(r.createdAt).toLocaleString()}</p>
//               </div>
//             ))}
//           </div>
//         )}
//       </div>
//     </>
//   );
// }



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

