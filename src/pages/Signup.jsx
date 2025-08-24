import React, { useState } from "react";
import Navbar from "./navbar";
import axios from "axios";
import { useNavigate } from "react-router-dom";

export default function Signup() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

  // 🔥 Handle Submit Function
  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const res = await axios.post(
        "http://localhost:5000/signup",
        {
          username: name,
          email,
          password,
        },
        { withCredentials: true }
      );

      alert(res.data.message);

      if (res.data.user) {
        localStorage.setItem("user", JSON.stringify(res.data.user));
      }

      console.log("✅ Signup Success:", res.data);

      navigate("/login");
    } catch (err) {
      console.error(" Signup Error:", err.response?.data || err.message);
      alert(err.response?.data?.message || "Signup failed");
    }
  };

  return (
    <>
      <Navbar />
      <div className="min-h-screen bg-gradient-to-tr from-purple-900 via-black to-purple-800 flex items-center justify-center px-4 sm:px-6 lg:px-8">
        <div className="bg-black/70 backdrop-blur-md w-full max-w-md rounded-3xl p-6 sm:p-8 shadow-2xl border border-purple-600">
          <h1 className="text-2xl sm:text-3xl md:text-4xl font-extrabold text-white mb-6 text-center tracking-wide">
            Create Your Account
          </h1>

          {/* ✅ handleSubmit */}
          <form className="space-y-4 sm:space-y-6" onSubmit={handleSubmit}>
            {/* Name */}
            <div>
              <label
                htmlFor="name"
                className="block text-purple-300 mb-1 sm:mb-2 text-sm sm:text-base font-semibold"
              >
                Full Name
              </label>
              <input
                id="name"
                type="text"
                placeholder="John Doe"
                value={name}
                onChange={(e) => setName(e.target.value)}
                required
                className="w-full rounded-lg bg-purple-950/40 border border-purple-700 py-2 sm:py-3 px-3 sm:px-4 text-white text-sm sm:text-base placeholder-purple-500 focus:outline-none focus:ring-2 focus:ring-purple-500"
              />
            </div>

            {/* Email */}
            <div>
              <label
                htmlFor="email"
                className="block text-purple-300 mb-1 sm:mb-2 text-sm sm:text-base font-semibold"
              >
                Email Address
              </label>
              <input
                id="email"
                type="email"
                placeholder="you@example.com"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
                className="w-full rounded-lg bg-purple-950/40 border border-purple-700 py-2 sm:py-3 px-3 sm:px-4 text-white text-sm sm:text-base placeholder-purple-500 focus:outline-none focus:ring-2 focus:ring-purple-500"
              />
            </div>

            {/* Password */}
            <div>
              <label
                htmlFor="password"
                className="block text-purple-300 mb-1 sm:mb-2 text-sm sm:text-base font-semibold"
              >
                Password
              </label>
              <input
                id="password"
                type="password"
                placeholder="Create a password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
                className="w-full rounded-lg bg-purple-950/40 border border-purple-700 py-2 sm:py-3 px-3 sm:px-4 text-white text-sm sm:text-base placeholder-purple-500 focus:outline-none focus:ring-2 focus:ring-purple-500"
              />
            </div>

            <button
              type="submit"
              className="w-full py-3 sm:py-4 rounded-lg bg-gradient-to-r from-purple-600 to-purple-800 text-white text-lg sm:text-xl font-extrabold hover:from-purple-700 hover:to-purple-900 transition"
            >
              Sign Up
            </button>
          </form>

          <p className="text-center mt-4 sm:mt-6 text-purple-300 text-sm sm:text-base">
            Already have an account?{" "}
            <a
              href="/login"
              className="text-white font-semibold hover:underline"
            >
              Login
            </a>
          </p>
        </div>
      </div>
    </>
  );
}
