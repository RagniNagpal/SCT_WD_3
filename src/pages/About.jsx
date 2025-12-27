
import React from 'react';
import { FaClipboardList, FaQuestionCircle, FaTrophy, FaUsers } from 'react-icons/fa';
import Navbar from './navbar';

const steps = [
  { icon: <FaClipboardList size={36} />, title: 'Select a Quiz', description: 'Choose from a variety of quizzes.' },
  { icon: <FaQuestionCircle size={36} />, title: 'Answer Questions', description: 'Attempt all questions within time.' },
  { icon: <FaTrophy size={36} />, title: 'Get Your Score', description: 'Receive instant feedback.' },
  { icon: <FaUsers size={36} />, title: 'Compete on Leaderboard', description: 'See your ranking globally.' },
];

const About = () => {
  return (
    <>
      <Navbar />

      <main className="flex flex-col items-center bg-gradient-to-tr from-indigo-900 via-purple-900 to-pink-900 px-6 py-24 space-y-20 min-h-screen">

        {/* About Section */}
        <div className="w-full max-w-4xl bg-gray-900/70 backdrop-blur-xl rounded-3xl p-10 shadow-2xl border border-purple-600 text-white flex flex-col gap-6">
          <h1 className="text-4xl md:text-5xl font-extrabold text-center">About Thinkleap</h1>
          <p className="text-gray-300 text-lg md:text-xl text-center">
            Thinkleap is your ultimate online quiz platform designed to help you test your knowledge, learn new things, and compete with others on a global leaderboard.
          </p>
          <p className="text-gray-300 text-lg md:text-xl text-center">
            Whether you want to sharpen your skills or simply enjoy fun quizzes, Thinkleap offers engaging content for everyone.
          </p>
          <p className="text-gray-300 text-lg md:text-xl text-center">
            Join our community and take your learning to the next level!
          </p>
          <div className="flex justify-center mt-6">
            <a
              href="/quiz"
              className="bg-gradient-to-r from-purple-600 to-indigo-700 px-8 py-3 rounded-2xl text-white text-lg font-bold shadow-lg hover:from-indigo-600 hover:to-purple-800 transform hover:-translate-y-1 transition-all duration-300"
            >
              Start Quizzing Now
            </a>
          </div>
        </div>

        {/* How It Works Section */}
        <section className="w-full max-w-5xl px-6 py-16 bg-gray-900/70 backdrop-blur-xl rounded-3xl shadow-2xl border border-purple-600 text-white">
          <h2 className="text-3xl md:text-4xl font-extrabold text-center mb-12">How It Works</h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-8">
            {steps.map(({ icon, title, description }, i) => (
              <div
                key={i}
                className="flex flex-col items-center gap-4 p-6 bg-black/50 rounded-2xl shadow-lg hover:scale-105 transform transition-all duration-300"
              >
                <div className="text-purple-400">{icon}</div>
                <h3 className="text-xl md:text-2xl font-bold">{title}</h3>
                <p className="text-purple-300 text-center text-sm md:text-base">{description}</p>
              </div>
            ))}
          </div>
        </section>
      </main>
    </>
  );
};

export default About;
