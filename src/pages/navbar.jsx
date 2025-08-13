import React, { useState } from "react";
import logo from "../assets/answer.png";

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);

  // Main navigation links
  const navLinks = [
    { name: "Home", href: "/home" },
    { name: "Quizzes", href: "/quiz" },
    { name: "About", href: "/about" },
    { name: "Contact", href: "/contact" },
  ];

  // Auth links
  const authLinks = [
    { name: "Dashboard", href: "/dash", style: "hover:text-indigo-700 transition duration-300 block" }, 
    { name: "Login", href: "/login", style: "bg-indigo-600 text-white hover:bg-indigo-800 px-4 py-1 rounded-md shadow-md" },
    { name: "Signup", href: "/signup", style: "bg-indigo-600 text-white hover:bg-indigo-800 px-4 py-1 rounded-md shadow-md" },
  ];

  return (
    <header className="fixed top-0 left-0 right-0 bg-gradient-to-r from-pink-300 via-purple-300 to-indigo-400 shadow-md z-50">
      <div className="max-w-7xl mx-auto flex items-center justify-between p-4">
        
        {/* Logo */}
        <a href="/home" className="flex items-center gap-3">
          <img src={logo} alt="Thinkleap Logo" className="w-10 h-10 object-contain" />
          <h1 className="text-gray-800 text-3xl font-bold tracking-wide">Thinkleap</h1>
        </a>

        {/* Mobile menu button */}
        <button
          onClick={() => setIsOpen(!isOpen)}
          className="md:hidden text-gray-800 focus:outline-none"
          aria-label="Toggle menu"
        >
          {isOpen ? (
            <svg className="w-8 h-8" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24" strokeLinecap="round" strokeLinejoin="round">
              <line x1="18" y1="6" x2="6" y2="18" />
              <line x1="6" y1="6" x2="18" y2="18" />
            </svg>
          ) : (
            <svg className="w-8 h-8" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24" strokeLinecap="round" strokeLinejoin="round">
              <line x1="3" y1="12" x2="21" y2="12" />
              <line x1="3" y1="6" x2="21" y2="6" />
              <line x1="3" y1="18" x2="21" y2="18" />
            </svg>
          )}
        </button>

        {/* Menu */}
        <nav
          className={`absolute md:static top-full left-0 w-full md:w-auto bg-gradient-to-r from-pink-300 via-purple-300 to-indigo-400 md:bg-transparent 
            transition-all duration-300 ease-in-out overflow-hidden md:flex md:items-center md:gap-8
            ${isOpen ? "max-h-screen py-4" : "max-h-0 md:max-h-full"}`}
        >
          <ul className="flex flex-col md:flex-row gap-6 md:gap-8 text-gray-800 font-medium text-lg px-4 md:px-0">
            {navLinks.map(link => (
              <li key={link.name}>
                <a href={link.href} className="hover:text-indigo-700 transition duration-300 block">{link.name}</a>
              </li>
            ))}
          </ul>

          {/* Auth Links */}
          <div className="flex flex-col md:flex-row gap-4 md:gap-6 mt-4 md:mt-0 px-4 md:px-0">
            {authLinks.map(link => (
              <a key={link.name} href={link.href} className={`${link.style} font-semibold block`}>
                {link.name}
              </a>
            ))}
          </div>
        </nav>
      </div>
    </header>
  );
};

export default Navbar;
