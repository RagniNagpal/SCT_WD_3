import React, { useState } from "react";
import Navbar from "./navbar";
import axios from "axios";
import emailjs from "@emailjs/browser";

const Contact = () => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [message, setMessage] = useState("");
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e) => {
  e.preventDefault();
  setLoading(true);
  try {
    // Backend call (optional)
    await axios.post("http://localhost:5000/contact", { name, email, message });

    // ✅ EmailJS send
    await emailjs.send(
      import.meta.env.VITE_EMAILJS_SERVICE_ID,
      import.meta.env.VITE_EMAILJS_TEMPLATE_ID,
      { name, email, message },
      import.meta.env.VITE_EMAILJS_PUBLIC_KEY
    );

    toast.success("Message sent via EmailJS!");
    setName(""); setEmail(""); setMessage("");
  } catch (err) {
    toast.error("Failed to send message");
  } finally {
    setLoading(false);
  }
};

  return (
    <>
      <Navbar />

      <main className="flex justify-center items-start min-h-screen bg-gradient-to-tr from-indigo-900 via-purple-900 to-pink-900 px-6 pt-32 pb-10">

        <div className="w-full max-w-lg bg-gray-900/70 backdrop-blur-xl rounded-3xl shadow-2xl border border-purple-600 p-8 flex flex-col gap-6">

          <h1 className="text-3xl md:text-4xl font-extrabold text-white text-center">
            Contact Us
          </h1>

          <p className="text-gray-300 text-center text-sm md:text-base">
            Have a question or feedback? We'd love to hear from you 💬
          </p>

          <form onSubmit={handleSubmit} className="flex flex-col gap-4">

            {/* Name */}
            <div className="flex flex-col">
              <label className="text-purple-300 font-medium text-sm mb-1">
                Full Name
              </label>
              <input
                type="text"
                placeholder="John Doe"
                required
                value={name}
                onChange={(e) => setName(e.target.value)}
                className="bg-gray-800/50 border border-purple-700 text-white placeholder-purple-400 rounded-xl px-4 py-3 focus:ring-2 focus:ring-purple-500 outline-none"
              />
            </div>

            {/* Email */}
            <div className="flex flex-col">
              <label className="text-purple-300 font-medium text-sm mb-1">
                Email Address
              </label>
              <input
                type="email"
                placeholder="you@example.com"
                required
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="bg-gray-800/50 border border-purple-700 text-white placeholder-purple-400 rounded-xl px-4 py-3 focus:ring-2 focus:ring-purple-500 outline-none"
              />
            </div>

            {/* Message */}
            <div className="flex flex-col">
              <label className="text-purple-300 font-medium text-sm mb-1">
                Message
              </label>
              <textarea
                rows="4"
                placeholder="Write your message here..."
                required
                value={message}
                onChange={(e) => setMessage(e.target.value)}
                className="bg-gray-800/50 border border-purple-700 text-white placeholder-purple-400 rounded-xl px-4 py-3 focus:ring-2 focus:ring-purple-500 outline-none resize-none"
              />
            </div>

            {/* Button */}
            <button
              type="submit"
              disabled={loading}
              className="mt-2 py-3 rounded-2xl bg-gradient-to-r from-pink-500 to-purple-600 text-white font-bold shadow-lg hover:from-purple-500 hover:to-pink-600 transition disabled:opacity-60"
            >
              {loading ? "Sending..." : "Send Message"}
            </button>

          </form>

        </div>
      </main>
    </>

  );
};

export default Contact;
