import React, { useState } from "react";
import Navbar from "./navbar";

export default function Signup() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  return (
    <>
    <Navbar />
    <div className="min-h-screen bg-gradient-to-tr from-purple-900 via-black to-purple-800 flex items-center justify-center px-6">
      <div className="bg-black/70 backdrop-blur-md max-w-md w-full rounded-3xl p-12 shadow-2xl border border-purple-600">
        <h1 className="text-5xl font-extrabold text-white mb-10 text-center tracking-wide">
          Create Your Account
        </h1>

        <form className="space-y-8">
          {/* Name */}
          <div>
            <label
              htmlFor="name"
              className="block text-purple-300 mb-3 text-lg font-semibold"
            >
              Full Name
            </label>
            <input
              id="name"
              type="text"
              placeholder="John Doe"
              value={name}
              onChange={(e) => setName(e.target.value)}
              className="w-full rounded-xl bg-purple-950/40 border border-purple-700 py-4 px-6 text-white text-lg placeholder-purple-500 focus:outline-none focus:ring-2 focus:ring-purple-500"
            />
          </div>

          {/* Email */}
          <div>
            <label
              htmlFor="email"
              className="block text-purple-300 mb-3 text-lg font-semibold"
            >
              Email Address
            </label>
            <input
              id="email"
              type="email"
              placeholder="you@example.com"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="w-full rounded-xl bg-purple-950/40 border border-purple-700 py-4 px-6 text-white text-lg placeholder-purple-500 focus:outline-none focus:ring-2 focus:ring-purple-500"
            />
          </div>

          {/* Password */}
          <div>
            <label
              htmlFor="password"
              className="block text-purple-300 mb-3 text-lg font-semibold"
            >
              Password
            </label>
            <input
              id="password"
              type="password"
              placeholder="Create a password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="w-full rounded-xl bg-purple-950/40 border border-purple-700 py-4 px-6 text-white text-lg placeholder-purple-500 focus:outline-none focus:ring-2 focus:ring-purple-500"
            />
          </div>

          <button
            type="submit"
            className="w-full py-5 rounded-xl bg-gradient-to-r from-purple-600 to-purple-800 text-white text-2xl font-extrabold hover:from-purple-700 hover:to-purple-900 transition"
          >
            Sign Up
          </button>
        </form>

        <p className="text-center mt-10 text-purple-300 text-lg">
          Already have an account?{" "}
          <a href="/login" className="text-white font-semibold hover:underline">
            Login
          </a>
        </p>
      </div>
    </div>
    </>
  );
}
