import React from 'react';
import Navbar from './navbar';
const Home = () => {
  return (
    <>
    <Navbar />
    <main className="min-h-screen flex flex-col justify-center items-center text-center 
                     bg-gradient-to-tr from-purple-900 via-black to-purple-800 px-6">
      <h1 className="text-5xl md:text-6xl font-extrabold text-white mb-6 tracking-wide drop-shadow-lg">
        Test Your Knowledge.<br /> Play Quizzes. Get Rewards!
      </h1>
      <p className="text-purple-300 text-lg md:text-xl mb-8 max-w-xl drop-shadow-md">
        Sharpen your mind with fun quizzes and challenge yourself every day!
      </p>
      <button className="bg-gradient-to-r from-purple-600 to-purple-800 text-white 
                         font-semibold px-8 py-4 rounded-xl shadow-lg hover:from-purple-700 hover:to-purple-900 transition">
        Start Quiz
      </button>
    </main>
    </>
  );
};

export default Home;
