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
    <div>
      <Navbar />

      <main className="min-h-screen flex flex-col items-center justify-center bg-gradient-to-tr from-purple-900 via-black to-purple-800 px-6 py-16 space-y-20 mt-6">
        {/* About Section */}
        <div className="bg-black/70 backdrop-blur-md max-w-4xl w-full rounded-3xl p-12 shadow-2xl border border-purple-600 text-white">
          <h1 className="text-5xl font-extrabold mb-8 text-center">About Thinkleap</h1>
          <p className="text-lg mb-6">
            Thinkleap is your ultimate online quiz platform designed to help you test your knowledge, learn new things, and compete with others on a global leaderboard.
          </p>
          <p className="text-lg mb-6">
            Whether you want to sharpen your skills or simply enjoy fun quizzes, Thinkleap offers engaging content for everyone.
          </p>
          <p className="text-lg mb-6">
            Join our community and take your learning to the next level!
          </p>
          <div className="text-center mt-10">
            <a
              href="/quiz"
              className="inline-block bg-gradient-to-r from-purple-600 to-purple-800 text-white py-3 px-8 rounded-xl text-xl font-bold hover:from-purple-700 hover:to-purple-900 transition"
            >
              Start Quizzing Now
            </a>
          </div>
        </div>

        {/* How It Works Section */}
        <section className="py-16 bg-gradient-to-tr from-purple-900 via-black to-purple-800 text-white px-6 w-full max-w-5xl rounded-3xl">
          <h2 className="text-4xl font-extrabold text-center mb-12">How It Works</h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-10 text-center">
            {steps.map(({ icon, title, description }, i) => (
              <div key={i} className="flex flex-col items-center gap-4 p-6 bg-black/50 rounded-xl shadow-lg">
                <div className="text-purple-400">{icon}</div>
                <h3 className="text-2xl font-bold">{title}</h3>
                <p className="text-purple-300">{description}</p>
              </div>
            ))}
          </div>
        </section>
      </main>
    </div>
  );
};

export default About;
