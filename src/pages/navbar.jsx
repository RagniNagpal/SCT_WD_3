
import React, { useState } from "react";
import { useNavigate, Link, useLocation } from "react-router-dom";
import logo from "../assets/options.png";

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const navigate = useNavigate();
  const location = useLocation(); 

  // ✅ user ko har route change pe re-read karega
  const user = JSON.parse(localStorage.getItem("user"));

  const navLinks = [
    { name: "Home", href: "/" },
    { name: "Quizzes", href: "/quiz" },
    { name: "About", href: "/about" },
    { name: "Contact", href: "/contact" },
  ];

  const handleLogout = () => {
    localStorage.removeItem("user"); // ✅ clear user
    navigate("/login", { replace: true }); // ✅ redirect
  };

  return (
    <header className="fixed top-0 left-0 right-0 z-50 bg-gradient-to-r from-purple-800 via-indigo-900 to-pink-900 shadow-lg">
      <div className="max-w-7xl mx-auto flex items-center justify-between p-4">
        
        {/* Logo */}
        <Link to="/" className="flex items-center gap-3">
          <img src={logo} alt="Thinkleap Logo" className="w-10 h-10 object-contain" />
          <h1 className="text-white text-2xl md:text-3xl font-bold tracking-wide">
            Thinkleap
          </h1>
        </Link>

        {/* Mobile Menu Button */}
        <button
          onClick={() => setIsOpen(!isOpen)}
          className="md:hidden text-white focus:outline-none"
        >
          {isOpen ? "✖" : "☰"}
        </button>

        {/* Menu */}
        <nav
          className={`absolute md:static top-full left-0 w-full md:w-auto 
          bg-gradient-to-r from-purple-800 via-indigo-900 to-pink-900 md:bg-transparent 
          overflow-hidden md:flex md:items-center md:gap-8 transition-all duration-300
          ${isOpen ? "max-h-screen py-4" : "max-h-0 md:max-h-full"}`}
        >
          {/* Nav Links */}
          <ul className="flex flex-col md:flex-row gap-4 md:gap-6 text-white font-medium text-lg px-4 md:px-0">
            {navLinks.map(link => (
              <li key={link.name}>
                <Link to={link.href} className="hover:text-pink-400">
                  {link.name}
                </Link>
              </li>
            ))}
          </ul>

          {/* Auth Buttons */}
          <div className="flex flex-col md:flex-row gap-3 md:gap-5 mt-4 md:mt-0 px-4 md:px-0">
            {user ? (
              <>
                <Link
                  to="/dashboard"
                  className="bg-green-600 hover:bg-green-700 text-white px-4 py-2 rounded-lg font-semibold text-center"
                >
                  Dashboard
                </Link>
                <button
                  onClick={handleLogout}
                  className="bg-red-600 hover:bg-red-700 text-white px-4 py-2 rounded-lg font-semibold"
                >
                  Logout
                </button>
              </>
            ) : (
              <>
                <Link
                  to="/login"
                  className="bg-pink-500 hover:bg-pink-800 text-white px-4 py-2 rounded-lg font-semibold text-center"
                >
                  Login
                </Link>
                <Link
                  to="/signup"
                  className="bg-blue-500 hover:bg-indigo-600 text-white px-4 py-2 rounded-lg font-semibold text-center"
                >
                  Sign Up
                </Link>
              </>
            )}
          </div>
        </nav>
      </div>
    </header>
  );
};

export default Navbar;
