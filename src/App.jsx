import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import ResultPage from "./pages/Result";
import SignupPage from "./pages/Signup"; 
import Login from "./pages/Login"; 
import Dash from "./pages/Dashboard"; 
import Navbar from "./pages/navbar";
import Home from "./pages/Home";
import Contact from "./pages/Contact";
import About from "./pages/About";
import Quiz from "./pages/Quiz";
function App() {
  return (
    <Router>
      <Routes>
        <Route path="/login" element={<Login />} />
        <Route path="/signup" element={<SignupPage />} />
        <Route path="/result" element={<ResultPage score={8} total={10} user="John Doe" />} />
         <Route path="/dash" element={<Dash />} />
         <Route path="/contact" element={<Contact />} />
         <Route path="/home" element={<Home />} />
         <Route path="/navbar" element={<Navbar/>} />
         <Route path="/contact" element={<Contact />} />
         <Route path="/about" element={<About />} />
         <Route path="/quiz" element={<Quiz />} />
      </Routes>
      <navbar />
    </Router>
    
  );
}

export default App;
