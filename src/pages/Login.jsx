import React, { useState } from "react";
import Navbar from "./navbar";
import axios from "axios";
import { useNavigate } from "react-router-dom";

export default function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

  // ✅ Handle login
  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const res = await axios.post(
        "http://localhost:5000/login",
        { email, password },
        { withCredentials: true }
      );

      if (res.data.user) {
        // ✅ user ko localStorage mei save karo
        localStorage.setItem("user", JSON.stringify(res.data.user));
        alert(res.data.message || "Login successful!");
        console.log("✅ Login Success:", res.data);

        // ✅ clear inputs
        setEmail("");
        setPassword("");

        // 🔀 Dashboard pe redirect
        navigate("/");
      } else {
        alert("Invalid login response from server!");
      }
    } catch (err) {
      console.error("❌ Login Error:", err.response?.data || err.message);
      alert(err.response?.data?.message || "Login failed");
    }
  };

  return (
    <>
      <Navbar />
      <div className="min-h-screen bg-gradient-to-tr from-purple-900 via-black to-purple-800 flex items-center justify-center px-6">
        <div className="bg-black/70 backdrop-blur-md max-w-md w-full rounded-3xl p-10 sm:p-12 shadow-2xl border border-purple-600 mt-[65px]">
          <h1 className="text-3xl sm:text-5xl font-extrabold text-white mb-8 sm:mb-10 text-center tracking-wide">
            Login to Your Account
          </h1>

          {/* ✅ handleSubmit */}
          <form className="space-y-6 sm:space-y-8" onSubmit={handleSubmit}>
            {/* Email */}
            <div>
              <label
                htmlFor="email"
                className="block text-purple-300 mb-2 sm:mb-3 text-base sm:text-lg font-semibold"
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
                className="w-full rounded-xl bg-purple-950/40 border border-purple-700 py-3 sm:py-4 px-4 sm:px-6 text-white text-base sm:text-lg placeholder-purple-500 focus:outline-none focus:ring-2 focus:ring-purple-500"
              />
            </div>

            {/* Password */}
            <div>
              <label
                htmlFor="password"
                className="block text-purple-300 mb-2 sm:mb-3 text-base sm:text-lg font-semibold"
              >
                Password
              </label>
              <input
                id="password"
                type="password"
                placeholder="Enter your password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
                className="w-full rounded-xl bg-purple-950/40 border border-purple-700 py-3 sm:py-4 px-4 sm:px-6 text-white text-base sm:text-lg placeholder-purple-500 focus:outline-none focus:ring-2 focus:ring-purple-500"
              />
            </div>

            <button
              type="submit"
              className="w-full py-4 sm:py-5 rounded-xl bg-gradient-to-r from-purple-600 to-purple-800 text-white text-xl sm:text-2xl font-extrabold hover:from-purple-700 hover:to-purple-900 transition"
            >
              Login
            </button>
          </form>

          <p className="text-center mt-6 sm:mt-10 text-purple-300 text-sm sm:text-lg">
            Don't have an account?{" "}
            <a
              href="/signup"
              className="text-white font-semibold hover:underline"
            >
              Sign Up
            </a>
          </p>
        </div>
      </div>
    </>
  );
}
