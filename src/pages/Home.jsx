
import React from 'react';
import Navbar from './navbar';

const Home = () => {
  return (
    <>
      <Navbar />
      <main className="min-h-screen flex flex-col justify-center items-center text-center px-6
                        bg-gradient-to-tr from-indigo-900 via-purple-900 to-pink-900">

        {/* Logo / Title */}
        <div className="mb-12">
          <h1 className="font-montserrat text-5xl md:text-7xl font-extrabold text-white 
                         mb-3 tracking-tight drop-shadow-2xl leading-tight">
            Thinkleap
          </h1>
          <p className="font-poppins text-pink-300 text-lg md:text-2xl drop-shadow-md">
            Test Your Knowledge. Play Quizzes. Get Rewards!
          </p>
        </div>

        {/* Main Heading */}
        <h2 className="font-montserrat text-4xl md:text-5xl font-bold text-white mb-6 drop-shadow-lg leading-snug">
          Sharpen your mind every day!
        </h2>

        {/* Subtitle */}
        <p className="font-poppins text-pink-200 text-lg md:text-xl mb-10 max-w-2xl drop-shadow-sm">
          Take fun quizzes, challenge yourself, and earn rewards as you grow.
        </p>

        {/* Buttons */}
        <div className="flex flex-col md:flex-row gap-4 md:gap-6">
          {/* Primary Button */}
          <button className="font-poppins text-white text-lg md:text-xl font-semibold px-10 py-4 rounded-2xl
                             bg-gradient-to-r from-pink-500 to-purple-600 shadow-2xl
                             hover:from-purple-500 hover:to-pink-600 transform hover:-translate-y-1
                             transition-all duration-300 ease-in-out">
            Start Quiz
          </button>

          {/* Secondary Button */}
          <button className="font-poppins text-white text-lg md:text-xl font-semibold px-10 py-4 rounded-2xl
                             bg-gradient-to-r from-gray-800/80 to-gray-900/90 shadow-xl
                             hover:from-gray-700/70 hover:to-gray-900/95 transform hover:-translate-y-1
                             transition-all duration-300 ease-in-out">
            Learn More
          </button>
        </div>

        
        <div className="absolute top-10 left-10 w-40 h-40 bg-pink-500/20 rounded-full blur-3xl animate-pulse"></div>
        <div className="absolute bottom-10 right-10 w-60 h-60 bg-purple-500/20 rounded-full blur-3xl animate-pulse"></div>

      </main>
    </>
  );
};

export default Home;
