
// import React, { useState } from "react";
// import logo from "../assets/options.png";

// const Navbar = () => {
//   const [isOpen, setIsOpen] = useState(false);

//   const navLinks = [
//     { name: "Home", href: "/" },
//     { name: "Quizzes", href: "/quiz" },
//     { name: "About", href: "/about" },
//     { name: "Contact", href: "/contact" },
//   ];

//   const authLinks = [
//     { name: "Dashboard", href: "/dashboard" },
//     { name: "Login", href: "/login" },
//     { name: "Signup", href: "/signup" },
//   ];

//   return (
//     <header className="fixed top-0 left-0 right-0 z-50 bg-gradient-to-r from-purple-800 via-indigo-900 to-pink-900 shadow-lg">
//       <div className="max-w-7xl mx-auto flex items-center justify-between p-4">
        
//         {/* Logo */}
//         <a href="/" className="flex items-center gap-3">
//           <img src={logo} alt="Thinkleap Logo" className="w-10 h-10 object-contain" />
//           <h1 className="text-white text-2xl md:text-3xl font-bold tracking-wide">Thinkleap</h1>
//         </a>

//         {/* Mobile Menu Button */}
//         <button
//           onClick={() => setIsOpen(!isOpen)}
//           className="md:hidden text-white focus:outline-none"
//           aria-label="Toggle menu"
//         >
//           {isOpen ? (
//             <svg className="w-8 h-8" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
//               <line x1="18" y1="6" x2="6" y2="18" />
//               <line x1="6" y1="6" x2="18" y2="18" />
//             </svg>
//           ) : (
//             <svg className="w-8 h-8" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
//               <line x1="3" y1="12" x2="21" y2="12" />
//               <line x1="3" y1="6" x2="21" y2="6" />
//               <line x1="3" y1="18" x2="21" y2="18" />
//             </svg>
//           )}
//         </button>

//         {/* Menu */}
//         <nav
//           className={`absolute md:static top-full left-0 w-full md:w-auto bg-gradient-to-r from-purple-800 via-indigo-900 to-pink-900 md:bg-transparent 
//                       overflow-hidden md:flex md:items-center md:gap-8 transition-all duration-300 ease-in-out
//                       ${isOpen ? "max-h-screen py-4" : "max-h-0 md:max-h-full"}`}
//         >
//           <ul className="flex flex-col md:flex-row gap-4 md:gap-6 text-white font-medium text-lg px-4 md:px-0">
//             {navLinks.map(link => (
//               <li key={link.name}>
//                 <a
//                   href={link.href}
//                   className="hover:text-pink-400 transition duration-300 block"
//                 >
//                   {link.name}
//                 </a>
//               </li>
//             ))}
//           </ul>

//           {/* Auth Links */}
//           <div className="flex flex-col md:flex-row gap-3 md:gap-5 mt-4 md:mt-0 px-4 md:px-0">
//             {authLinks.map(link => (
//               <a
//                 key={link.name}
//                 href={link.href}
//                 className="bg-pink-500 hover:bg-purple-600 text-white px-4 py-2 rounded-lg font-semibold shadow-md transition duration-300 text-center"
//               >
//                 {link.name}
//               </a>
//             ))}
//           </div>
//         </nav>
//       </div>
//     </header>
//   );
// };

// export default Navbar;
import React, { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import logo from "../assets/options.png";

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const navigate = useNavigate();

  // ✅ Check if user is logged in
  const user = JSON.parse(localStorage.getItem("user"));

  const navLinks = [
    { name: "Home", href: "/" },
    { name: "Quizzes", href: "/quiz" },
    { name: "About", href: "/about" },
    { name: "Contact", href: "/contact" },
  ];

  const handleLogout = async () => {
    try {
      // Optional: backend logout if session-based
      await fetch("http://localhost:5000/logout", {
        method: "POST",
        credentials: "include",
      });

      // Frontend logout
      localStorage.removeItem("user");
      navigate("/login", { replace: true });
    } catch (err) {
      console.error("Logout failed:", err);
    }
  };

  return (
    <header className="fixed top-0 left-0 right-0 z-50 bg-gradient-to-r from-purple-800 via-indigo-900 to-pink-900 shadow-lg">
      <div className="max-w-7xl mx-auto flex items-center justify-between p-4">
        
        {/* Logo */}
        <Link to="/" className="flex items-center gap-3">
          <img src={logo} alt="Thinkleap Logo" className="w-10 h-10 object-contain" />
          <h1 className="text-white text-2xl md:text-3xl font-bold tracking-wide">Thinkleap</h1>
        </Link>

        {/* Mobile Menu Button */}
        <button
          onClick={() => setIsOpen(!isOpen)}
          className="md:hidden text-white focus:outline-none"
          aria-label="Toggle menu"
        >
          {isOpen ? (
            <svg className="w-8 h-8" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
              <line x1="18" y1="6" x2="6" y2="18" />
              <line x1="6" y1="6" x2="18" y2="18" />
            </svg>
          ) : (
            <svg className="w-8 h-8" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
              <line x1="3" y1="12" x2="21" y2="12" />
              <line x1="3" y1="6" x2="21" y2="6" />
              <line x1="3" y1="18" x2="21" y2="18" />
            </svg>
          )}
        </button>

        {/* Menu */}
        <nav
          className={`absolute md:static top-full left-0 w-full md:w-auto bg-gradient-to-r from-purple-800 via-indigo-900 to-pink-900 md:bg-transparent 
                      overflow-hidden md:flex md:items-center md:gap-8 transition-all duration-300 ease-in-out
                      ${isOpen ? "max-h-screen py-4" : "max-h-0 md:max-h-full"}`}
        >
          {/* Main nav links */}
          <ul className="flex flex-col md:flex-row gap-4 md:gap-6 text-white font-medium text-lg px-4 md:px-0">
            {navLinks.map(link => (
              <li key={link.name}>
                <Link
                  to={link.href}
                  className="hover:text-pink-400 transition duration-300 block"
                >
                  {link.name}
                </Link>
              </li>
            ))}
          </ul>

          {/* Auth Links */}
          <div className="flex flex-col md:flex-row gap-3 md:gap-5 mt-4 md:mt-0 px-4 md:px-0">
            {user ? (
              <>
                <Link
                  to="/dashboard"
                  className="bg-green-600 hover:bg-green-700 text-white px-4 py-2 rounded-lg font-semibold shadow-md text-center transition"
                >
                  Dashboard
                </Link>
                <button
                  onClick={handleLogout}
                  className="bg-red-600 hover:bg-red-700 text-white px-4 py-2 rounded-lg font-semibold shadow-md text-center transition"
                >
                  Logout
                </button>
              </>
            ) : (
              <>
                <Link
                  to="/login"
                  className="bg-pink-500 hover:bg-purple-600 text-white px-4 py-2 rounded-lg font-semibold shadow-md text-center transition"
                >
                  Login
                </Link>
                <Link
                  to="/signup"
                  className="bg-blue-500 hover:bg-indigo-600 text-white px-4 py-2 rounded-lg font-semibold shadow-md text-center transition"
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
