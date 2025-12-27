



// import React, { useState } from "react";
// import { useNavigate } from "react-router-dom";
// import Navbar from "./navbar";

// export default function Login() {
//   const [email, setEmail] = useState("");
//   const [password, setPassword] = useState("");
//   const navigate = useNavigate();

//   const handleLogin = async (e) => {
//     e.preventDefault();

//     try {
//       const res = await fetch("http://localhost:5000/login", {
//         method: "POST",
//         headers: { "Content-Type": "application/json" },
//         credentials: "include",
//         body: JSON.stringify({ email, password }),
//       });

//       const data = await res.json();
//       if (!res.ok) throw new Error(data.message);

//       // ✅ MOST IMPORTANT LINE
//       localStorage.setItem("user", JSON.stringify(data.user));

//       navigate("/quiz");
//     } catch (err) {
//       alert(err.message);
//     }
//   };

//   return (
//     <>
//       <Navbar />
//       <div className="min-h-screen flex items-center justify-center bg-gradient-to-tr from-purple-900 via-black to-purple-800">
//         <form onSubmit={handleLogin} className="bg-black/70 p-8 rounded-2xl w-96 text-white">
//           <h2 className="text-2xl font-bold mb-6 text-center">Login</h2>

//           <input
//             type="email"
//             placeholder="Email"
//             className="w-full mb-4 p-3 rounded bg-gray-800"
//             onChange={(e) => setEmail(e.target.value)}
//           />

//           <input
//             type="password"
//             placeholder="Password"
//             className="w-full mb-4 p-3 rounded bg-gray-800"
//             onChange={(e) => setPassword(e.target.value)}
//           />

//           <button className="w-full bg-purple-700 py-3 rounded font-bold">
//             Login
//           </button>
//         </form>
//       </div>
//     </>
//   );
// }




import React, { useState } from "react";
import Navbar from "./navbar";
import { useNavigate } from "react-router-dom";

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault();
    try {
      const res = await fetch("http://localhost:5000/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        credentials: "include",
        body: JSON.stringify({ email, password }),
      });

      const data = await res.json();
      if (!res.ok) throw new Error(data.message);

      localStorage.setItem("user", JSON.stringify(data.user));
      navigate("/quiz");
    } catch (err) {
      alert(err.message);
    }
  };

  return (
    <>
      <Navbar />
      <main className="flex justify-center items-start min-h-screen bg-gradient-to-tr from-indigo-900 via-purple-900 to-pink-900 px-6 pt-32 pb-1">

        <div className="w-full max-w-lg bg-gray-900/70 backdrop-blur-xl rounded-3xl shadow-2xl border border-purple-600 p-8 flex flex-col gap-6">

          <h1 className="text-3xl md:text-4xl font-extrabold text-white text-center">
            Welcome Back
          </h1>
          <p className="text-gray-300 text-center text-sm md:text-base">
            Login to continue your quizzes
          </p>

          <form onSubmit={handleLogin} className="flex flex-col gap-4">

            <div className="flex flex-col">
              <label className="text-purple-300 font-medium text-sm mb-1">
                Email Address
              </label>
              <input
                type="email"
                placeholder="you@example.com"
                required
                onChange={(e) => setEmail(e.target.value)}
                className="bg-gray-800/50 border border-purple-700 text-white placeholder-purple-400 rounded-xl px-4 py-3 focus:ring-2 focus:ring-purple-500 outline-none"
              />
            </div>

            <div className="flex flex-col">
              <label className="text-purple-300 font-medium text-sm mb-1">
                Password
              </label>
              <input
                type="password"
                placeholder="Your password"
                required
                onChange={(e) => setPassword(e.target.value)}
                className="bg-gray-800/50 border border-purple-700 text-white placeholder-purple-400 rounded-xl px-4 py-3 focus:ring-2 focus:ring-purple-500 outline-none"
              />
            </div>

            <button
              type="submit"
              className="mt-2 py-3 rounded-2xl bg-gradient-to-r from-pink-500 to-purple-600 text-white font-bold shadow-lg hover:from-purple-500 hover:to-pink-600 transition"
            >
              Login
            </button>
          </form>
        </div>
      </main>
    </>
  );
};

export default Login;
