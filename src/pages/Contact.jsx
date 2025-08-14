import React from 'react';
import Navbar from './navbar';


const Contact = () => {
  return (
    <>
      <Navbar />
<main className="flex items-center justify-center bg-gradient-to-tr from-purple-900 via-black to-purple-800 px-6 pt-[80px] pb-[40px]">
  <div className="bg-black/70 backdrop-blur-md max-w-md w-full rounded-3xl p-5 shadow-2xl border border-purple-600">

          <h1 className="text-4xl font-extrabold text-white mb-8 text-center tracking-wide">
            Contact Us
          </h1>
          <form className="space-y-8">
            <div>
              <label htmlFor="name" className="block text-purple-300 mb-3 font-semibold">
                Full Name
              </label>
              <input
                id="name"
                type="text"
                placeholder="Your Name"
                className="w-full rounded-xl bg-purple-950/40 border border-purple-700 py-4 px-6 text-white placeholder-purple-500 focus:outline-none focus:ring-2 focus:ring-purple-500"
              />
            </div>

            <div>
              <label htmlFor="email" className="block text-purple-300 mb-3 font-semibold">
                Email Address
              </label>
              <input
                id="email"
                type="email"
                placeholder="you@example.com"
                className="w-full rounded-xl bg-purple-950/40 border border-purple-700 py-4 px-6 text-white placeholder-purple-500 focus:outline-none focus:ring-2 focus:ring-purple-500"
              />
            </div>

            <div>
              <label htmlFor="message" className="block text-purple-300 mb-3 font-semibold">
                Message
              </label>
              <textarea
                id="message"
                placeholder="Your message here..."
                rows={5}
                className="w-full rounded-xl bg-purple-950/40 border border-purple-700 py-4 px-6 text-white placeholder-purple-500 focus:outline-none focus:ring-2 focus:ring-purple-500 resize-none"
              />
            </div>

            <button
              type="submit"
              className="w-full py-5 rounded-xl bg-gradient-to-r from-purple-600 to-purple-800 text-white text-2xl font-extrabold hover:from-purple-700 hover:to-purple-900 transition"
            >
              Send Message
            </button>
          </form>
        </div>
      </main>
    </>
  );
};

export default Contact;

